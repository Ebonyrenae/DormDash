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
$price = $data['proposed_price'] ?? null;
$note = $data['price_note'] ?? ""; // ✅ fixed field name to match DB column

if (!$job_id || !$price) {
  echo json_encode(["success" => false, "message" => "Missing job id or price"]);
  exit;
}

try {
  $stmt = $pdo->prepare("
    UPDATE jobs 
    SET proposed_price = ?, price_note = ?, price_status = 'pending'
    WHERE id = ?
  ");
  $stmt->execute([$price, $note, $job_id]);

  echo json_encode(["success" => true]);
} catch (PDOException $e) {
  echo json_encode(["success" => false, "message" => $e->getMessage()]);
}