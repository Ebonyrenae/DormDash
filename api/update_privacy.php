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

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(200);
  exit();
}

require_once "config.php";

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

$userId   = $data["userId"]   ?? null;
$settings = $data["settings"] ?? null;

if (!$userId || !is_array($settings)) {
  http_response_code(400);
  echo json_encode(["success" => false, "message" => "Missing userId or settings"]);
  exit();
}

$profileVisible = !empty($settings["profileVisible"]) ? 1 : 0;
$showEmail      = !empty($settings["showEmail"]) ? 1 : 0;
$showPhone      = !empty($settings["showPhone"]) ? 1 : 0;
$dataSharing    = !empty($settings["dataSharing"]) ? 1 : 0;

try {
  // Provide required NOT NULL columns on INSERT (only used if row doesn't exist yet)
  $sql = "
    INSERT INTO notification_settings
      (user_id, sms_enabled, email_enabled, push_enabled,
       public_profile_enabled, show_email_enabled, show_phone_enabled, data_sharing_enabled)
    VALUES
      (?, 0, 0, 0, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      public_profile_enabled = VALUES(public_profile_enabled),
      show_email_enabled     = VALUES(show_email_enabled),
      show_phone_enabled     = VALUES(show_phone_enabled),
      data_sharing_enabled   = VALUES(data_sharing_enabled),
      sms_enabled            = sms_enabled,
      email_enabled          = email_enabled,
      push_enabled           = push_enabled
  ";

  $stmt = $pdo->prepare($sql);
  $stmt->execute([$userId, $profileVisible, $showEmail, $showPhone, $dataSharing]);

  echo json_encode(["success" => true, "message" => "Privacy settings updated successfully"]);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(["success" => false, "message" => "DB error: " . $e->getMessage()]);
}