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
$userId = $data['userId']; // You'll need to pass the user's ID from the frontend
$newEmail = $data['email'];

// Validate email format
if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Check if the new email already exists (and it's not the current user's email)
$checkSql = "SELECT * FROM users WHERE email = ? AND id != ?";
$checkStmt = $pdo->prepare($checkSql);
$checkStmt->execute([$newEmail, $userId]);

if ($checkStmt->rowCount() > 0) {
    echo json_encode(['success' => false, 'message' => 'This email is already associated with another account']);
    exit;
}

try {
    // Update the email in the database
    $sql = "UPDATE users SET email = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$newEmail, $userId]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Email updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'No changes were made']);
    }
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>