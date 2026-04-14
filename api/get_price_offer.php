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
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(200);
  echo json_encode(["success" => true]);
  exit();
}

require_once 'config.php';

$job_id = $_GET['job_id'] ?? null;

if (!$job_id) {
  echo json_encode(["success" => false, "message" => "Missing job id"]);
  exit;
}

try {
  $stmt = $pdo->prepare("
    SELECT proposed_price, price_note, price_status 
    FROM jobs WHERE id = ?
  ");
  $stmt->execute([$job_id]);
  $data = $stmt->fetch(PDO::FETCH_ASSOC);

  echo json_encode(["success" => true, "offer" => $data]);
} catch (PDOException $e) {
  echo json_encode(["success" => false, "message" => $e->getMessage()]);
}