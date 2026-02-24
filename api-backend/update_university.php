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
$university = $data['university'];

try {
    // Update the university in the database
    $sql = "UPDATE account_info SET college = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$university, $userId]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'University updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'No changes were made']);
    }
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>