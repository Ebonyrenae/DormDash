<?php
header('Content-Type: application/json');

$allowed_origins = [
  "https://aptitude.cse.buffalo.edu",
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

$userId = $_SESSION['user_id'] ?? null;
if (!$userId) {
  echo json_encode(['success' => false, 'message' => 'Not logged in']);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$serviceType  = $data['serviceType'] ?? '';
$title        = $data['title'] ?? '';
$date         = $data['date'] ?? '';
$time         = $data['time'] ?? '';
$budget       = $data['budget'] ?? '';
$location     = $data['location'] ?? '';
$description  = $data['description'] ?? '';

if (!$serviceType || !$title || !$date || !$time || !$budget || !$location) {
  echo json_encode(['success' => false, 'message' => 'Missing required fields']);
  exit;
}

try {
  $sql = "INSERT INTO jobs (user_id, service_type, title, job_date, job_time, budget, location, description)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([$userId, $serviceType, $title, $date, $time, $budget, $location, $description]);

  echo json_encode(['success' => true, 'message' => 'Job created successfully']);
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}