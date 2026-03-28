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

$receivedData = file_get_contents("php://input");
$data = json_decode($receivedData, true);

$status       = $data['status'] ?? null;
$jobId        = $data['job_id'] ?? null;
$completed_at = $data['completed_at'] ?? null;
$completion_code = $data['completion_code'] ?? null;

$userId = $_SESSION['user_id'] ?? $data['user_id'] ?? null;
if (!$userId) {
  echo json_encode(['success' => false, 'message' => 'Not logged in']);
  exit;
}

try {
    // If marking complete, check completion code first
    if ($status === "complete") {
        $stmt = $pdo->prepare("SELECT completion_code FROM jobs WHERE id = ?");
        $stmt->execute([$jobId]);
        $job = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$job) {
            echo json_encode(["success" => false, "message" => "Job not found"]);
            exit;
        }

        if ($job['completion_code'] !== $completion_code) {
            echo json_encode(["success" => false, "message" => "Incorrect completion code"]);
            exit;
        }

        // If completed_at was sent, format it for MySQL
        if ($completed_at) {
            $dt = new DateTime($completed_at);
            $mysql_completed_at = $dt->format('Y-m-d H:i:s');

            $sql = "UPDATE jobs SET status = ?, completed_at = ? WHERE id = ? AND accepted_by = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$status, $mysql_completed_at, $jobId, $userId]);
        } else {
            // No completed_at sent, just update status
            $sql = "UPDATE jobs SET status = ? WHERE id = ? AND accepted_by = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$status, $jobId, $userId]);
        }
    } else {
        // For other statuses (in_progress, pending, etc.)
        $sql = "UPDATE jobs SET status = ? WHERE id = ? AND accepted_by = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$status, $jobId, $userId]);
    }

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}