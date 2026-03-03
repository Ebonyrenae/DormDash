<?php
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
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(200);
  exit();
}

$secure = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off");
session_set_cookie_params([
  "lifetime" => 0,
  "path" => "/",
  "secure" => $secure,
  "httponly" => true,
  "samesite" => $secure ? "None" : "Lax",
]);
session_start();

if (!isset($_SESSION["user_id"])) {
  http_response_code(401);
  echo json_encode(["success" => false, "message" => "Not logged in"]);
  exit;
}

$userId = (int)$_SESSION["user_id"];
require_once __DIR__ . "/config.php";

try {
  $stmt = $pdo->prepare("SELECT profile_photo FROM users WHERE id = ?");
  $stmt->execute([$userId]);
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  $filename = $row["profile_photo"] ?? null;

  $stmt = $pdo->prepare("UPDATE users SET profile_photo = NULL WHERE id = ?");
  $stmt->execute([$userId]);

  if ($filename) {
    $path = __DIR__ . "/uploads/" . $filename;
    if (file_exists($path)) {
      @unlink($path);
    }
  }

  echo json_encode(["success" => true, "profilePhoto" => null]);
} catch (PDOException $e) {
  echo json_encode(["success" => false, "message" => "Database error"]);
}
