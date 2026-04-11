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

$userId = $_SESSION['user_id'] ?? null;
if (!$userId) {
  echo json_encode(['success' => false, 'message' => 'Not logged in']);
  exit;
}

try {
  $sql = "SELECT jobs.id, jobs.user_id, jobs.service_type, jobs.title, 
        jobs.description, jobs.budget, jobs.location, jobs.job_date, 
        jobs.job_time, jobs.status, jobs.created_at, jobs.completion_code, 
        jobs.confirmation_code, jobs.price_status, jobs.proposed_price, 
        jobs.price_note, users.username as accepted_by_name
        FROM jobs
        LEFT JOIN users ON jobs.accepted_by = users.id
        WHERE jobs.user_id = ?
        ORDER BY jobs.created_at DESC";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([$userId]);
  $jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode(['success' => true, 'jobs' => $jobs]);
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}