<?php
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => '',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'None'
]);

session_start();

/* CORS — IMPORTANT FOR SESSIONS */
header("Access-Control-Allow-Origin: https://aptitude.cse.buffalo.edu");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

header("Content-Type: application/json");

$host = "localhost";
$user = "narde";
$pass = "50501035";
$db = "cse442_2026_spring_team_i_db";

$conn = new mysqli($host,$user,$pass,$db);

if ($conn->connect_error) {
    echo json_encode(["success"=>false,"message"=>"db connection failed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$identifier = $data["identifier"] ?? "";
$password = $data["password"] ?? "";

$stmt = $conn->prepare("SELECT id,username,email,password FROM users WHERE email=? OR username=?");
$stmt->bind_param("ss",$identifier,$identifier);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["success"=>false,"message"=>"user not found"]);
    exit;
}

$userRow = $result->fetch_assoc();

if (!password_verify($password,$userRow["password"])) {
    echo json_encode(["success"=>false,"message"=>"invalid password"]);
    exit;
}

/* ✅ SESSION SET */
$_SESSION["user_id"] = $userRow["id"];
$_SESSION["username"] = $userRow["username"];
$_SESSION["email"] = $userRow["email"];

echo json_encode([
    "success"=>true,
    "user"=>[
        "id"=>$userRow["id"],
        "username"=>$userRow["username"],
        "email"=>$userRow["email"]
    ]
]);
?>
