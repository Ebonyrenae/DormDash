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

try {
  $sql = "SELECT jobs.id, jobs.user_id, jobs.service_type, jobs.title, 
                 jobs.description, jobs.budget, jobs.location, 
                 jobs.job_date, jobs.job_time, jobs.created_at,
                 users.username
          FROM jobs
          LEFT JOIN users ON jobs.user_id = users.id
          ORDER BY jobs.created_at DESC";
          
  $jobs = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode(['success' => true, 'jobs' => $jobs]);
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}




 /* $sql = "SELECT id, user_id, service_type, title, description, budget, location, job_date, job_time, created_at
          FROM jobs
          ORDER BY created_at DESC";
  $jobs = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode(['success' => true, 'jobs' => $jobs]);
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}*/