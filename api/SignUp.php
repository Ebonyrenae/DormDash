<?php
// 1. DYNAMIC ORIGIN (Required for Credentials/Cookies)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$allowed_origins = [
    "http://localhost:5173", 
    "https://cattle.cse.buffalo.edu",
    "https://aptitude.cse.buffalo.edu"
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// 2. HANDLE PREFLIGHT (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';
session_start(); // ✅ START SESSION HERE

// 3. SECURE DATA INPUT
$receiveddata = file_get_contents("php://input");
$data = json_decode($receiveddata, true);

$fullname = $data['fullname'] ?? null;
$email    = $data['email'] ?? null;
$password = $data['password'] ?? null;

if (!$fullname || !$email || !$password) {
    echo json_encode(["success" => false, "message" => "Missing data"]);
    exit;
}

// 4. CHECK EMAIL
$checkStmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$checkStmt->execute([$email]);
if ($checkStmt->fetch()) {
    echo json_encode(["success" => false, "message" => "Email already exists"]);
    exit;
}

// 5. REGISTER & LOGIN
try {
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$fullname, $email, $hashed_password]);
    
    $user_id = $pdo->lastInsertId();

    // ✅ LOG THE USER IN IMMEDIATELY
    $_SESSION['user_id'] = $user_id;

    echo json_encode([
        "success" => true,
        "message" => "User registered and logged in",
        "user_id" => $user_id
    ]);

} catch(PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database Error"]);
}
?>