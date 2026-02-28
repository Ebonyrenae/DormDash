<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

header("Content-Type: application/json");

/* DB */
$host = "localhost";
$user = "narde";
$pass = "50501035";
$db   = "cse442_2026_spring_team_i_db";

$conn = new mysqli($host,$user,$pass,$db);

if ($conn->connect_error) {
    echo json_encode(["success"=>false,"message"=>"db connection failed"]);
    exit;
}

/* Read JSON */
$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data["username"] ?? "");
$email    = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");

/* Validate */
if($username === "" || $email === "" || $password === ""){
    echo json_encode(["success"=>false,"message"=>"missing fields"]);
    exit;
}

/* Check existing email */
$check = $conn->prepare("SELECT id FROM users WHERE email=?");
$check->bind_param("s",$email);
$check->execute();
$res = $check->get_result();

if($res->num_rows > 0){
    echo json_encode(["success"=>false,"message"=>"email already exists"]);
    exit;
}

/* Hash password */
$hash = password_hash($password, PASSWORD_DEFAULT);

/* Insert */
$stmt = $conn->prepare("INSERT INTO users (username,email,password) VALUES (?,?,?)");
$stmt->bind_param("sss",$username,$email,$hash);

if(!$stmt->execute()){
    echo json_encode(["success"=>false,"message"=>"insert failed"]);
    exit;
}

echo json_encode(["success"=>true]);
?>