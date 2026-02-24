<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get JSON input
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Validate
if (!isset($data['userId']) || !isset($data['dob'])) {
    echo json_encode([
        "success" => false,
        "message" => "Missing userId or dateOfBirth"
    ]);
    exit;
}

$user_id = $data['userId'];
$dateOfBirth = $data['dob'];

try {

    // Update DOB for user
    $sql = "UPDATE account_info 
            SET `date of birth` = ?
            WHERE user_id = ?";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$dateOfBirth, $user_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Date of birth updated successfully"
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