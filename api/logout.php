<?php
$isHttps = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off") ||
           ($_SERVER["SERVER_PORT"] == 443);

session_set_cookie_params([
  "lifetime" => 0,
  "path" => "/",
  "secure" => $isHttps,
  "httponly" => true,
  "samesite" => $isHttps ? "None" : "Lax",
]);

session_start();

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

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(200);
  exit();
}

$_SESSION = [];

if (ini_get("session.use_cookies")) {
  $params = session_get_cookie_params();
  setcookie(session_name(), "", time() - 42000, [
    "path" => $params["path"] ?: "/",
    "domain" => $params["domain"] ?? "",
    "secure" => (bool)($params["secure"] ?? false),
    "httponly" => (bool)($params["httponly"] ?? true),
    "samesite" => $params["samesite"] ?? ($isHttps ? "None" : "Lax"),
  ]);
}

session_destroy();

echo json_encode([
  "success" => true,
  "loggedIn" => false,
]);
