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
// Get JSON input
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Validate
if (!isset($data['user_id']) || !array_key_exists('dob', $data)) {
    echo json_encode([
        "success" => false,
        "message" => "Missing user_id or dateOfBirth"
    ]);
    exit;
}

$user_id = $data['user_id'];
$dateOfBirth = !empty($data['dob']) ? $data['dob'] : null;

try {
"INSERT INTO account_info (`date of birth`, user_id) VALUES (?, ?)". "ON DUPLICATE KEY UPDATE `date of birth` = VALUES(`date of birth`)";
    // Update DOB for user
    $sql = 

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$dateOfBirth, $user_id]);

    echo json_encode([
        "success" => true,
        "message" => "Date of birth updated successfully"
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>
