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
$profileVisible = $settings['profileVisible'] ? 1 : 0;
$showEmail = $settings['showEmail'] ? 1 : 0;
$showPhone = $settings['showPhone'] ? 1 : 0;
$dataSharing = $settings['dataSharing'] ? 1 : 0;

try {
    // Check if privacy settings already exist for this user
    $checkSql = "SELECT * FROM notification_settings WHERE user_id = ?";
    $checkStmt = $pdo->prepare($checkSql);
    $checkStmt->execute([$userId]);
    
    if ($checkStmt->rowCount() > 0) {
        // Update existing privacy settings
        $sql = "UPDATE notification_settings 
                SET public_profile_enabled = ?, show_email_enabled = ?, show_phone_enabled = ?, data_sharing_enabled = ? 
                WHERE user_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$profileVisible, $showEmail, $showPhone, $dataSharing, $userId]);
    } else {
        // Insert new privacy settings
        $sql = "INSERT INTO notification_settings (user_id, public_profile_enabled, show_email_enabled, show_phone_enabled, data_sharing_enabled) 
                VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$userId, $profileVisible, $showEmail, $showPhone, $dataSharing]);
    }
    
    echo json_encode(['success' => true, 'message' => 'Privacy settings updated successfully']);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>