<?php
// me.php
header("Content-Type: application/json");

$allowed_origins = [
  "https://aptitude.cse.buffalo.edu",
  "https://cattle.cse.buffalo.edu",
  "http://localhost:5173",
];

$origin = $_SERVER["HTTP_ORIGIN"] ?? "";
if (in_array($origin, $allowed_origins, true)) {
  header("Access-Control-Allow-Origin: $origin");
  header("Access-Control-Allow-Credentials: true");
  header("Vary: Origin");
}
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(200);
  exit();
}

// IMPORTANT: secure cookies only work on HTTPS.
// For localhost dev, you may be on http. Handle that safely:
$isHttps = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off");

// Replace your current session_set_cookie_params with this:
session_set_cookie_params([
  'lifetime' => 0,
  'path' => '/',
  'secure' => true,      // FORCE to true for aptitude
  'httponly' => true,
  'samesite' => 'None'   // Required for cross-origin / Buffalo setup
]);


session_start();

if (isset($_SESSION["user_id"])) {
  echo json_encode([
    "loggedIn" => true,
    "user" => [
      "id" => (int)$_SESSION["user_id"],
      "username" => $_SESSION["username"] ?? null,
      "email" => $_SESSION["email"] ?? null,
    ]
  ]);
} else {
  echo json_encode(["loggedIn" => false]);
}