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

session_start();
require_once 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
if (!is_array($data)) {
  echo json_encode(['success' => false, 'message' => 'Invalid JSON body']);
  exit;
}

$userId = $_SESSION['user_id'] ?? null;
if (!$userId) {
  echo json_encode(['success' => false, 'message' => 'Not logged in']);
  exit;
}

$jobId = $data['job_id'] ?? null;
if ($jobId === null || $jobId === '') {
  echo json_encode(['success' => false, 'message' => 'Missing job id']);
  exit;
}

$jobId = (int) $jobId;
if ($jobId < 1) {
  echo json_encode(['success' => false, 'message' => 'Invalid job id']);
  exit;
}

try {
  $stmt = $pdo->prepare("SELECT id, user_id FROM jobs WHERE id = ?");
  $stmt->execute([$jobId]);
  $job = $stmt->fetch(PDO::FETCH_ASSOC);

  if (!$job) {
    echo json_encode(['success' => false, 'message' => 'Job not found']);
    exit;
  }

  if ((int) $job['user_id'] !== (int) $userId) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Forbidden']);
    exit;
  }

  $updates = [];
  $params = [];

  if (array_key_exists('serviceType', $data)) {
    $v = trim((string) $data['serviceType']);
    if ($v === '') {
      echo json_encode(['success' => false, 'message' => 'Service type cannot be empty']);
      exit;
    }
    $updates[] = 'service_type = ?';
    $params[] = $v;
  }

  if (array_key_exists('title', $data)) {
    $v = trim((string) $data['title']);
    if ($v === '') {
      echo json_encode(['success' => false, 'message' => 'Title cannot be empty']);
      exit;
    }
    $updates[] = 'title = ?';
    $params[] = $v;
  }

  if (array_key_exists('date', $data)) {
    $v = trim((string) $data['date']);
    if ($v === '') {
      echo json_encode(['success' => false, 'message' => 'Date cannot be empty']);
      exit;
    }
    $updates[] = 'job_date = ?';
    $params[] = $v;
  }

  if (array_key_exists('time', $data)) {
    $v = trim((string) $data['time']);
    if ($v === '') {
      echo json_encode(['success' => false, 'message' => 'Time cannot be empty']);
      exit;
    }
    $updates[] = 'job_time = ?';
    $params[] = $v;
  }

  if (array_key_exists('budget', $data)) {
    $v = trim((string) $data['budget']);
    if ($v === '') {
      echo json_encode(['success' => false, 'message' => 'Budget cannot be empty']);
      exit;
    }
    $updates[] = 'budget = ?';
    $params[] = $v;
  }

  if (array_key_exists('location', $data)) {
    $v = trim((string) $data['location']);
    if ($v === '') {
      echo json_encode(['success' => false, 'message' => 'Location cannot be empty']);
      exit;
    }
    $updates[] = 'location = ?';
    $params[] = $v;
  }

  if (array_key_exists('description', $data)) {
    $updates[] = 'description = ?';
    $params[] = (string) $data['description'];
  }

  if (count($updates) === 0) {
    echo json_encode(['success' => false, 'message' => 'No fields to update']);
    exit;
  }

  $sql = 'UPDATE jobs SET ' . implode(', ', $updates) . ' WHERE id = ? AND user_id = ?';
  $params[] = $jobId;
  $params[] = $userId;

  $stmt = $pdo->prepare($sql);
  $stmt->execute($params);

  echo json_encode(['success' => true, 'message' => 'Job updated successfully']);
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
