<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get raw data
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Validate input
if (!isset($data['user_id'])) {
    echo json_encode([
        "success" => false,
        "message" => "User ID missing"
    ]);
    exit;
}

$user_id = $data['user_id'];
$college = $data['college'] ?? null;
$major = $data['major'] ?? null;
$year = $data['year'] ?? null;

try {

    // Update existing user row
    $sql = "UPDATE users 
            SET college = ?, major = ?, year_in_school = ?
            WHERE id = ?";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$college, $major, $year, $user_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Academic info updated successfully"
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