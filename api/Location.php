<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get JSON data
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Validate input
if (
    !isset($data['userId']) ||
    !isset($data['street']) ||
    !isset($data['city']) ||
    !isset($data['state']) ||
    !isset($data['zip'])
) {
    echo json_encode([
        "success" => false,
        "message" => "Missing required fields"
    ]);
    exit;
}

$user_id = $data['userId'];
$street = $data['street'];
$city = $data['city'];
$state = $data['state'];
$zip = $data['zip'];

try {

    // Update location info for the user
    $sql = "UPDATE account_info 
            SET address = ?, 
                city = ?, 
                state = ?, 
                zip_code = ?
            WHERE user_id = ?";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$street, $city, $state, $zip, $user_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Location updated successfully"
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