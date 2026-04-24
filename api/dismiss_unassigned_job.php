<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

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

session_start();
require_once 'config.php';

// Read body first so we can use it as fallback for user_id
$data = json_decode(file_get_contents("php://input"), true);
$jobId = $data['job_id'] ?? null;
$userId = $_SESSION['user_id'] ?? $data['user_id'] ?? null;

if (!$userId) {
  echo json_encode(["success" => false, "message" => "Not logged in"]);
  exit;
}

if (!$jobId) {
  echo json_encode(["success" => false, "message" => "Missing job id"]);
  exit;
}

try {
  $stmt = $pdo->prepare("
    UPDATE jobs 
    SET dismissed_by_user = 1
    WHERE id = ?
    AND was_unassigned = 1
  ");
  $stmt->execute([$jobId]);

  $rowsAffected = $stmt->rowCount();

  if ($rowsAffected === 0) {
    echo json_encode(["success" => false, "message" => "No matching job found or already dismissed"]);
    exit;
  }

  echo json_encode(["success" => true]);
} catch (PDOException $e) {
  echo json_encode(["success" => false, "message" => "DB Error: " . $e->getMessage()]);
}