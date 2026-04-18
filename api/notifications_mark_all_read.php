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
header("Access-Control-Allow-Methods: POST, OPTIONS");
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

$body = json_decode(file_get_contents('php://input'), true);

try {
  // Mark ALL notifications read
  if (!empty($body['mark_all'])) {
    $stmt = $pdo->prepare(
      "UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0"
    );
    $stmt->execute([(int)$userId]);
    echo json_encode(['success' => true, 'updated' => $stmt->rowCount()]);
    exit;
  }

  // Mark a single notification read
  $notifId = isset($body['notification_id']) ? (int)$body['notification_id'] : 0;
  if (!$notifId) {
    echo json_encode(['success' => false, 'message' => 'Missing notification_id']);
    exit;
  }

  // The WHERE includes user_id so users can only mark their own notifications
  $stmt = $pdo->prepare(
    "UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?"
  );
  $stmt->execute([$notifId, (int)$userId]);

  echo json_encode(['success' => true, 'updated' => $stmt->rowCount()]);

} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}