<?php
// Set the response header to indicate that the response will be in JSON format
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Include the configuration file to get the database connection details
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

// Get the user ID from the query parameters
$userId = $_GET['userId'] ?? null;

if (!$userId) {
    echo json_encode(['success' => false, 'message' => 'User ID is required']);
    exit;
}

try {
    // Get user data from BOTH users and account_info tables
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
    
    // Get notification settings from the notification_settings table
    $notifSql = "SELECT sms_enabled, email_enabled, push_enabled FROM notification_settings WHERE user_id = ?";
    $notifStmt = $pdo->prepare($notifSql);
    $notifStmt->execute([$userId]);
    $notifRow = $notifStmt->fetch(PDO::FETCH_ASSOC);
    
    // Map database columns to frontend format
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
        // Default values if no notification settings exist
        $notificationSettings = [
            'email' => true,
            'push' => true,
            'sms' => false,
            'deadlines' => true,
            'grades' => true,
            'events' => false
        ];
    }
    
    // Privacy settings - hardcoded defaults for now
    $privacySettings = [
        'profileVisible' => true,
        'showEmail' => false,
        'showPhone' => false,
        'dataSharing' => true
    ];
    
    // Return user data
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
?>