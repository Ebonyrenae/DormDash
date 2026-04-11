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

require_once 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$job_id = $data['job_id'] ?? null;
$action = $data['action'] ?? null;

if (!$job_id || !$action) {
  echo json_encode(["success" => false, "message" => "Missing job id or action"]);
  exit;
}

try {
  if ($action === "accept") {
    $stmt = $pdo->prepare("
      UPDATE jobs 
      SET budget = proposed_price, price_status = 'accepted', proposed_price = NULL, price_note = NULL
      WHERE id = ?
    ");
  } else {
    $stmt = $pdo->prepare("
      UPDATE jobs 
      SET price_status = 'declined', proposed_price = NULL, price_note = NULL
      WHERE id = ?
    ");
  }

  $stmt->execute([$job_id]);
  echo json_encode(["success" => true]);
} catch (PDOException $e) {
  echo json_encode(["success" => false, "message" => $e->getMessage()]);
}