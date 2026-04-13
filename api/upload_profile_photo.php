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

if (!isset($_FILES["photo"]) || $_FILES["photo"]["error"] !== UPLOAD_ERR_OK) {
  echo json_encode(["success" => false, "message" => "Make sure image is selected and less than 5MB and file type is jpg, png, gif, or webp"]);
  exit;
}

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($_FILES["photo"]["tmp_name"]);
$allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
if (!in_array($mime, $allowed, true)) {
  echo json_encode(["success" => false, "message" => "Invalid file type"]);
  exit;
}

$maxBytes = 5 * 1024 * 1024; // 5MB
if ($_FILES["photo"]["size"] > $maxBytes) {
  echo json_encode(["success" => false, "message" => "File too large"]);
  exit;
}

$ext = [
  "image/jpeg" => "jpg",
  "image/png" => "png",
  "image/gif" => "gif",
  "image/webp" => "webp",
][$mime];

$uploadDir = __DIR__ . "/uploads";
if (!is_dir($uploadDir)) {
  mkdir($uploadDir, 0755, true);
}

$userId = (int)$_SESSION["user_id"];
$filename = $userId . "_" . time() . "." . $ext;
$path = $uploadDir . "/" . $filename;

if (!move_uploaded_file($_FILES["photo"]["tmp_name"], $path)) {
  echo json_encode(["success" => false, "message" => "Save failed"]);
  exit;
}

require_once __DIR__ . "/config.php";

try {
  $stmt = $pdo->prepare("UPDATE users SET profile_photo = ? WHERE id = ?");
  $stmt->execute([$filename, $userId]);
  echo json_encode(["success" => true, "profilePhoto" => $filename]);
} catch (PDOException $e) {
  @unlink($path);
  echo json_encode(["success" => false, "message" => "Database error"]);
}
