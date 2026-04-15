<?php
header('Content-Type: application/json');

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
  echo json_encode(["success" => true]);
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

require_once 'config.php';

$body = json_decode(file_get_contents("php://input"), true);

$job_id           = $body["job_id"] ?? null;
$reviewed_user_id = $body["dasher_id"] ?? null;
$rating           = $body["stars"] ?? null;
$review_text      = $body["review_text"] ?? "";
$reviewer_id      = $_SESSION["user_id"];

if (!$job_id || !$reviewed_user_id || !$rating) {
  echo json_encode(["success" => false, "message" => "Missing required fields"]);
  exit;
}

if ($rating < 1 || $rating > 5) {
  echo json_encode(["success" => false, "message" => "Rating must be between 1 and 5"]);
  exit;
}

try {
  // Check if review already exists for this job
  $check = $pdo->prepare("SELECT id FROM reviews WHERE job_id = ? AND reviewer_id = ?");
  $check->execute([$job_id, $reviewer_id]);
  if ($check->fetch()) {
    echo json_encode(["success" => false, "message" => "You have already reviewed this job"]);
    exit;
  }

  $stmt = $pdo->prepare("
    INSERT INTO reviews (job_id, reviewer_id, reviewed_user_id, rating, review_text)
    VALUES (?, ?, ?, ?, ?)
  ");
  $stmt->execute([$job_id, $reviewer_id, $reviewed_user_id, $rating, $review_text]);

  echo json_encode(["success" => true]);
} catch (PDOException $e) {
  echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}