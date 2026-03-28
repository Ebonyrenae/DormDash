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

session_start();
require_once 'config.php';

$userId = $_SESSION['user_id'] ?? $_GET['user_id'] ?? null;
if (!$userId) {
  echo json_encode(['success' => false, 'message' => 'Not logged in']);
  exit;
}

try {
  $sql = "SELECT id, user_id, service_type, title, description, budget, 
          location, job_date, job_time, created_at, status, completed_at
          FROM jobs
          WHERE accepted_by = ?
          ORDER BY created_at DESC";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([$userId]);
  $jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode(['success' => true, 'jobs' => $jobs]);
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}