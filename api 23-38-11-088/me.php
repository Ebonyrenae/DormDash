<?php
// me.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://www-student.cse.buffalo.edu");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
session_start();

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

// 1. Detect HTTPS environment
$isHttps = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off") || 
           ($_SERVER['SERVER_PORT'] == 443);

// 2. Adaptive Cookie Params
// On Localhost (HTTP), 'secure' must be false and 'samesite' should be 'Lax'
// On Buffalo (HTTPS), 'secure' must be true and 'samesite' must be 'None'
session_set_cookie_params([
  'lifetime' => 0,
  'path' => '/',
  'secure'   => $isHttps, 
  'httponly' => true,
  'samesite' => $isHttps ? 'None' : 'Lax' 
]);

session_start();

if (!isset($_SESSION["user_id"])) {
  echo json_encode(["loggedIn" => false]);
  exit;
}

$userId = (int)$_SESSION["user_id"];
$user = [
  "id" => $userId,
  "username" => $_SESSION["username"] ?? null,
  "email" => $_SESSION["email"] ?? null,
];

try {
  require_once __DIR__ . "/config.php";
  $stmt = $pdo->prepare("SELECT university, program, bio, experience, profile_photo FROM users WHERE id = ?");
  $stmt->execute([$userId]);
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  if ($row) {
    if (isset($row["university"])) $user["university"] = $row["university"];
    if (isset($row["program"])) $user["program"] = $row["program"];
    if (isset($row["bio"])) $user["bio"] = $row["bio"];
    if (isset($row["experience"])) {
      $user["experience"] = $row["experience"] ? json_decode($row["experience"], true) : [];
      if (!is_array($user["experience"])) $user["experience"] = [];
    }
    if (!empty($row["profile_photo"])) {
      $user["profilePhoto"] = $row["profile_photo"];
    }
  }
} catch (Exception $e) {
  // Gracefully degrade if columns don't exist
}

echo json_encode(["loggedIn" => true, "user" => $user]);