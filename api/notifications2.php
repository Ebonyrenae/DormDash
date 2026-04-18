<?php
header('Content-Type: application/json');

$allowed_origins = [
  "https://aptitude.cse.buffalo.edu",
  "https://cattle.cse.buffalo.edu",
  "http://localhost:5173",
];

$origin = $_SERVER["HTTP_ORIGIN"] ?? "";
if (in_array($origin, $allowed_origins, true)) {
  header("Access-Control-Allow-Origin: $origin");
  header("Access-Control-Allow-Credentials: true");
  header("Vary: Origin");
}
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(200);
  echo json_encode(["success" => true]);
  exit();
}

session_start();
require_once 'config.php';

$userId = $_SESSION['user_id'] ?? null;
if (!$userId) {
  echo json_encode(['success' => false, 'message' => 'Not logged in']);
  exit;
}

try {
  // Ensure table exists.
  $pdo->exec(
    "CREATE TABLE IF NOT EXISTS notifications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      type VARCHAR(50) NOT NULL,
      actor_user_id INT NULL,
      job_id INT NULL,
      message VARCHAR(255) NOT NULL,
      is_read TINYINT(1) NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uniq_user_type_job (user_id, type, job_id),
      INDEX idx_user_created (user_id, created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
  );

  // Check for actor_user_id column.
  $colStmt = $pdo->prepare(
    "SELECT COUNT(*) AS c
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'notifications'
       AND COLUMN_NAME = 'actor_user_id'"
  );
  $colStmt->execute();
  $hasActor = (int)($colStmt->fetch(PDO::FETCH_ASSOC)["c"] ?? 0) > 0;
  if (!$hasActor) {
    $pdo->exec("ALTER TABLE notifications ADD COLUMN actor_user_id INT NULL AFTER type");
  }

  $pdo->prepare(
  "INSERT IGNORE INTO notifications (user_id, type, actor_user_id, job_id, message)
   SELECT
     j.user_id AS user_id,
     'job_accepted' AS type,
     j.accepted_by AS actor_user_id,
     j.id AS job_id,
     CONCAT(
       COALESCE(ua.username, 'Someone'),
       ' accepted your job'
     ) AS message
   FROM jobs j
   LEFT JOIN users ua ON ua.id = j.accepted_by
   WHERE j.user_id = ?
     AND j.status = 'active'
     AND j.accepted_by IS NOT NULL"
)->execute([(int)$userId]);

  // 2. Upgrade block: Cleaned up SET syntax (removed 'As message' alias)
  $pdo->prepare(
    "UPDATE notifications n
     JOIN jobs j ON j.id = n.job_id
     LEFT JOIN users ua ON ua.id = j.accepted_by
     SET
       n.actor_user_id = j.accepted_by,
       n.message = CONCAT(
         COALESCE(ua.username, 'Someone'),
         ' accepted your job'
       )
     WHERE n.user_id = ?
       AND n.type = 'job_accepted'
       AND (n.actor_user_id IS NULL OR n.actor_user_id = 0)"
  )->execute([(int)$userId]);

  // Fetch results
  $stmt = $pdo->prepare(
  "SELECT n.id, n.type, n.actor_user_id, n.job_id, n.message, n.is_read, n.created_at,
          j.title AS job_title
   FROM notifications n
   LEFT JOIN jobs j ON j.id = n.job_id
   WHERE n.user_id = ?
   ORDER BY n.created_at DESC
   LIMIT 50"
);
  $stmt->execute([(int)$userId]);
  $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

  // Count unread
  $unreadStmt = $pdo->prepare(
    "SELECT COUNT(*) AS unreadCount
     FROM notifications
     WHERE user_id = ? AND is_read = 0"
  );
  $unreadStmt->execute([(int)$userId]);
  $unread = (int)($unreadStmt->fetch(PDO::FETCH_ASSOC)["unreadCount"] ?? 0);

  echo json_encode(['success' => true, 'unreadCount' => $unread, 'notifications' => $items]);
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}