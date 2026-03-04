<?php
// 1. MUST BE AT THE TOP: Configure how the session cookie behaves
$isHttps = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off") || 
           ($_SERVER['SERVER_PORT'] == 443);

session_set_cookie_params([
  'lifetime' => 0,
  'path' => '/',
  'secure'   => $isHttps, 
  'httponly' => true,
  'samesite' => $isHttps ? 'None' : 'Lax' 
]);

// 2. START SESSION: Now it uses the settings above
session_start();

// 3. CORS HEADERS: Explicitly allow credentials
$allowed_origins = [
  "https://aptitude.cse.buffalo.edu",
  "https://cattle.cse.buffalo.edu",
 
  "http://localhost:5173",
];

$origin = $_SERVER["HTTP_ORIGIN"] ?? "";
if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: https://www-student.cse.buffalo.edu");
}

header("Access-Control-Allow-Credentials: true"); // Required for your React fetch
header("Content-Type: application/json");

if (isset($_SESSION["user_id"])) {
  echo json_encode([
    "loggedIn" => true,
    "user" => [
      "id" => (int)$_SESSION["user_id"],
      "username" => $_SESSION["username"],
      "email" => $_SESSION["email"]
    ]
  ]);
} else {
  echo json_encode(["loggedIn" => false]);
}