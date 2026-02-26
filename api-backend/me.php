<?php
// CORS headers - ADD THESE FIRST
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => '',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'None'
]);
session_start();
header("Content-Type: application/json");
if(isset($_SESSION["user_id"])) {
    echo json_encode([
        "loggedIn"=>true,
        "user"=>[
            "id"=>$_SESSION["user_id"],
            "username"=>$_SESSION["username"],
            "email"=>$_SESSION["email"]
        ]
    ]);
} else {
    echo json_encode(["loggedIn"=>false]);
}