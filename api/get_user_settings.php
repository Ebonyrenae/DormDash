<?php
header('Content-Type: application/json');

$allowed_origins = [
  "https://aptitude.cse.buffalo.edu",
  "http://localhost:5173",
];

$origin = $_SERVER["HTTP_ORIGIN"] ?? "";
if (in_array($origin, $allowed_origins, true)) {
  header("Access-Control-Allow-Origin: $origin");
  header("Access-Control-Allow-Credentials: true");
  header("Vary: Origin");
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(200);
  exit();
}

require_once 'config.php';

// Get the user ID from the query parameters
$userId = $_GET['userId'] ?? null;

if (!$userId) {
  echo json_encode(['success' => false, 'message' => 'User ID is required']);
  exit;
}

try {
  $sql = "SELECT 
            u.id,
            u.username,
            u.email,
            a.`phone number` as phone,
            a.college
          FROM users u
          LEFT JOIN account_info a ON u.id = a.id
          WHERE u.id = ?";

  $stmt = $pdo->prepare($sql);
  $stmt->execute([$userId]);
  $user = $stmt->fetch(PDO::FETCH_ASSOC);

  if (!$user) {
    echo json_encode(['success' => false, 'message' => 'User not found']);
    exit;
  }

  $notifSql = "SELECT sms_enabled, email_enabled, push_enabled
               FROM notification_settings
               WHERE user_id = ?";
  $notifStmt = $pdo->prepare($notifSql);
  $notifStmt->execute([$userId]);
  $notifRow = $notifStmt->fetch(PDO::FETCH_ASSOC);

  if ($notifRow) {
    $notificationSettings = [
      'email' => (bool)$notifRow['email_enabled'],
      'push' => (bool)$notifRow['push_enabled'],
      'sms' => (bool)$notifRow['sms_enabled'],
      'deadlines' => true,
      'grades' => true,
      'events' => false
    ];
  } else {
    $notificationSettings = [
      'email' => true,
      'push' => true,
      'sms' => false,
      'deadlines' => true,
      'grades' => true,
      'events' => false
    ];
  }

  $privacySettings = [
    'profileVisible' => true,
    'showEmail' => false,
    'showPhone' => false,
    'dataSharing' => true
  ];

  echo json_encode([
    'success' => true,
    'data' => [
      'username' => $user['username'] ?? 'User',
      'email' => $user['email'] ?? '',
      'phone' => $user['phone'] ?? '',
      'university' => $user['college'] ?? '',
      'notificationSettings' => $notificationSettings,
      'privacySettings' => $privacySettings
    ]
  ]);
} catch(PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}