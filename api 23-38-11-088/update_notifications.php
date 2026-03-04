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

require_once 'config.php';

// Set the response header to indicate that the response will be in JSON format

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

// Get the raw POST data and decode it from JSON
$receivedData = file_get_contents("php://input");
$data = json_decode($receivedData, true);

// Extract the data from the request
$userId = $data['userId'];
$settings = $data['settings'];

// Map frontend settings to database columns
$smsEnabled = $settings['sms'] ? 1 : 0;
$emailEnabled = $settings['email'] ? 1 : 0;
$pushEnabled = $settings['push'] ? 1 : 0; // Using 'push' for phone notifications

try {
    // Check if notification settings already exist for this user
    $sql = "INSERT INTO notification_settings (user_id, email_enabled, push_enabled, sms_enabled)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE email_enabled = VALUES(email_enabled), push_enabled = VALUES(push_enabled), sms_enabled = VALUES(sms_enabled)";
    $checkStmt = $pdo->prepare($sql);
    $checkStmt->execute([$userId, $emailEnabled, $pushEnabled, $smsEnabled]);
    
    if ($checkStmt->rowCount() > 0) {
        // Update existing notification settings
        $sql = "UPDATE notification_settings SET sms_enabled = ?, email_enabled = ?, push_enabled = ? WHERE user_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$smsEnabled, $emailEnabled, $pushEnabled, $userId]);
    } else {
        // Insert new notification settings
        $sql = "INSERT INTO notification_settings (user_id, sms_enabled, email_enabled, push_enabled) VALUES (?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$userId, $smsEnabled, $emailEnabled, $pushEnabled]);
    }
    
    echo json_encode(['success' => true, 'message' => 'Notification settings updated successfully']);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>