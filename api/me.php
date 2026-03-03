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

// Optional profile columns (only if DB has them via schema_profile.sql / schema_profile_photo.sql)
try {
  require_once __DIR__ . "/config.php";
  $stmt = $pdo->prepare("SELECT university, program, bio, experience, profile_photo FROM users WHERE id = ?");
  $stmt->execute([$userId]);
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  if ($row) {
    if (array_key_exists("university", $row)) $user["university"] = $row["university"] ?? "";
    if (array_key_exists("program", $row)) $user["program"] = $row["program"] ?? "";
    if (array_key_exists("bio", $row)) $user["bio"] = $row["bio"] ?? "";
    if (array_key_exists("experience", $row)) {
      $user["experience"] = $row["experience"] ? json_decode($row["experience"], true) : [];
      if (!is_array($user["experience"])) $user["experience"] = [];
    }
    if (array_key_exists("profile_photo", $row) && $row["profile_photo"] !== null && $row["profile_photo"] !== "")
      $user["profilePhoto"] = $row["profile_photo"];
  }
} catch (Exception $e) {
  // Profile columns may not exist yet; keep only id, username, email
}

echo json_encode(["loggedIn" => true, "user" => $user]);