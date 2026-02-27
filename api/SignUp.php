<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once 'config.php';

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get raw input
$receiveddata = file_get_contents("php://input");
$data = json_decode($receiveddata, true);



$fullname = $data['fullname'];
$email = $data['email'];
$password = $data['password'];

// 🔥 CHECK IF EMAIL EXISTS
$checkSql = "SELECT COUNT(*) FROM users WHERE email = ?";
$checkStmt = $pdo->prepare($checkSql);
$checkStmt->execute([$email]);

$emailExists = $checkStmt->fetchColumn();

if ($emailExists > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Provided email already exists"
    ]);
    exit;
}

// Hash password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

try {

    $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$fullname, $email, $hashed_password]);
    

    // ✅ GET THE NEW USER ID
    $user_id = $pdo->lastInsertId();

    echo json_encode([
        "success" => true,
        "message" => "User registered successfully",
        "user_id" => $user_id
    ]);

} catch(PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => "Database Error: " . $e->getMessage()
    ]);
}

?>