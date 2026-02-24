<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get JSON data
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Validate input
if (!isset($data['user_id']) || !isset($data['selectedGender'])) {
    echo json_encode([
        "success" => false,
        "message" => "Missing user_id or gender"
    ]);
    exit;
}

$user_id = $data['user_id'];
$gender = $data['selectedGender'];

try {

    // Update gender for that user
    $sql = "UPDATE account_info 
            SET gender = ?
            WHERE id = ?";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$gender, $user_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Gender updated successfully"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "User not found or no changes made"
        ]);
    }

} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}

?>