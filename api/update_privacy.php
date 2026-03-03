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

require_once 'config.php';

$receivedData = file_get_contents("php://input");
$data = json_decode($receivedData, true);

$userId = $data['userId'] ?? null;
$settings = $data['settings'] ?? null;

if (!$userId || !is_array($settings)) {
  echo json_encode(['success' => false, 'message' => 'Missing userId or settings']);
  exit;
}

$profileVisible = !empty($settings['profileVisible']) ? 1 : 0;
$showEmail      = !empty($settings['showEmail']) ? 1 : 0;
$showPhone      = !empty($settings['showPhone']) ? 1 : 0;
$dataSharing    = !empty($settings['dataSharing']) ? 1 : 0;

try {
  // 1) Ensure notification_settings row exists (avoid sms_enabled default errors)
  $sql = "INSERT INTO notification_settings (user_id, sms_enabled, email_enabled, push_enabled)
          VALUES (?, 0, 1, 1)
          ON DUPLICATE KEY UPDATE user_id = user_id";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([$userId]);

  // 2) Update ONLY privacy columns
  $sql = "UPDATE notification_settings
          SET public_profile_enabled = ?, show_email_enabled = ?, show_phone_enabled = ?, data_sharing_enabled = ?
          WHERE user_id = ?";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([$profileVisible, $showEmail, $showPhone, $dataSharing, $userId]);

  echo json_encode(['success' => true, 'message' => 'Privacy settings updated successfully']);
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}