<?php
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

$f = $_GET["f"] ?? "";
if ($f === "" || !preg_match('/^[a-zA-Z0-9_.-]+$/', $f)) {
  http_response_code(400);
  exit("Bad request");
}

$path = __DIR__ . "/uploads/" . $f;
if (!is_file($path)) {
  http_response_code(404);
  exit("Not found");
}

$ext = strtolower(pathinfo($f, PATHINFO_EXTENSION));
$types = [
  "jpg" => "image/jpeg",
  "jpeg" => "image/jpeg",
  "png" => "image/png",
  "gif" => "image/gif",
  "webp" => "image/webp",
];
$mime = $types[$ext] ?? "application/octet-stream";
header("Content-Type: " . $mime);
readfile($path);
