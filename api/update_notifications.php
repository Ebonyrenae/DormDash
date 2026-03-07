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
  exit();
}

require_once "config.php";

// Read JSON body
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

$userId = $data["userId"] ?? null;
$settings = $data["settings"] ?? null;

if (!$userId || !is_array($settings)) {
  http_response_code(400);
  echo json_encode(["success" => false, "message" => "Missing userId or settings"]);
  exit();
}

// Map frontend settings -> DB columns
// (If your DB only has these 3, keep these 3)
$smsEnabled   = !empty($settings["sms"]) ? 1 : 0;
$emailEnabled = !empty($settings["email"]) ? 1 : 0;
$pushEnabled  = !empty($settings["push"]) ? 1 : 0;

// OPTIONAL: if your table also has these columns, uncomment them
// $deadlinesEnabled = !empty($settings["deadlines"]) ? 1 : 0;
// $gradesEnabled    = !empty($settings["grades"]) ? 1 : 0;
// $eventsEnabled    = !empty($settings["events"]) ? 1 : 0;

try {
  // ONE write: insert if new, update if exists (requires UNIQUE(user_id))
  $sql = "
    INSERT INTO notification_settings (user_id, email_enabled, push_enabled, sms_enabled)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      email_enabled = VALUES(email_enabled),
      push_enabled  = VALUES(push_enabled),
      sms_enabled   = VALUES(sms_enabled)
  ";

  // If you also store deadlines/grades/events, use this instead:
  /*
  $sql = "
    INSERT INTO notification_settings
      (user_id, email_enabled, push_enabled, sms_enabled, deadlines_enabled, grades_enabled, events_enabled)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      email_enabled      = VALUES(email_enabled),
      push_enabled       = VALUES(push_enabled),
      sms_enabled        = VALUES(sms_enabled),
      deadlines_enabled  = VALUES(deadlines_enabled),
      grades_enabled     = VALUES(grades_enabled),
      events_enabled     = VALUES(events_enabled)
  ";
  */

  $stmt = $pdo->prepare($sql);

  // Basic version bind:
  $stmt->execute([$userId, $emailEnabled, $pushEnabled, $smsEnabled]);

  // If using deadlines/grades/events version, bind like this:
  // $stmt->execute([$userId, $emailEnabled, $pushEnabled, $smsEnabled, $deadlinesEnabled, $gradesEnabled, $eventsEnabled]);

  echo json_encode(["success" => true, "message" => "Notification settings updated"]);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(["success" => false, "message" => "DB error: " . $e->getMessage()]);
}