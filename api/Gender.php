<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
require_once 'config.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
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
    $sql = "INSERT INTO account_info (`gender`, user_id) VALUES (?, ?)". "ON DUPLICATE KEY UPDATE `gender` = VALUES(`gender`)";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$gender, $user_id]);

   
        echo json_encode([
            "success" => true,
            "message" => "Gender updated successfully"
        ]);
   

} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}

?>