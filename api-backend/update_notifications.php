<?php
// Set the response header to indicate that the response will be in JSON format
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Include the configuration file to get the database connection details
require_once 'config.php';

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
    $checkSql = "SELECT * FROM notification_settings WHERE user_id = ?";
    $checkStmt = $pdo->prepare($checkSql);
    $checkStmt->execute([$userId]);
    
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