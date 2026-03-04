<?php
session_start();
header('Content-Type: application/json');

// 1. DYNAMIC CORS (Fixes Wildcard + Credentials error)
$allowed_origins = [
    "https://aptitude.cse.buffalo.edu",
    "https://cattle.cse.buffalo.edu",
    "http://localhost:5173"
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Vary: Origin");
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

// Check for 'username' because that is what your React code sends
if (isset($data['username'], $data['email'], $data['password'])) {
    $name = $data['username']; 
    $email = $data['email'];
    $passwords = password_hash($data['password'], PASSWORD_BCRYPT);

    try {
        // 2. INSERT INTO users table
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$name, $email, $passwords]);
        $user_id = $pdo->lastInsertId();

        // 3. CREATE HOOK FOR DOB PAGE
        // This ensures the row exists so DOB.php has something to update later
        $stmt2 = $pdo->prepare("INSERT INTO account_info (user_id) VALUES (?)");
        $stmt2->execute([$user_id]);

$fullname = $data['fullname'] ?? null;
$email    = $data['email'] ?? null;
$password = $data['password'] ?? null;

        // 5. AUTO-LOGIN (Set session variables exactly like teammates)
    $_SESSION["user_id"] = $user_id;
    $_SESSION["username"] = $name;
    $_SESSION["email"] = $email;

        echo json_encode([
            "success" => true, 
            "user_id" => $user_id,
            "message" => "Account created for $name"
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        

        if ($e->getCode() == 23000) {
        echo json_encode(["success" => false, "message" => "email is already associated with an account. "]);
    } else {
        // This helps you debug if it's a different database issue
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
    }
} else {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
}
?>
