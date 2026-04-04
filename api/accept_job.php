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
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Vary: Origin");
}

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once 'config.php';

try {
    $raw = file_get_contents("php://input");
    $body = json_decode($raw, true);

    if (!$body) {
        echo json_encode(["success" => false, "message" => "Invalid JSON"]);
        exit();
    }

    $job_id = $body["job_id"] ?? null;
    $accepted_by = $body["accepted_by"] ?? null;

    if (!$job_id || !$accepted_by) {
        echo json_encode(["success" => false, "message" => "Missing data"]);
        exit();
    }

    // Check if this dasher was EVER unassigned from this job using history table
    $historyStmt = $pdo->prepare("
        SELECT COUNT(*) as count 
        FROM job_unassignments 
        WHERE job_id = ? AND dasher_id = ?
    ");
    $historyStmt->execute([$job_id, $accepted_by]);
    $result = $historyStmt->fetch(PDO::FETCH_ASSOC);

    if ((int)$result['count'] > 0) {
        echo json_encode([
            "success" => false,
            "message" => "You cannot accept this job again after being unassigned.",
            "blocked" => true
        ]);
        exit();
    }

    // Check if this dasher was previously unassigned from this job
$checkStmt = $pdo->prepare("SELECT unassigned_from, status FROM jobs WHERE id = ?");
$checkStmt->execute([$job_id]);
$job = $checkStmt->fetch(PDO::FETCH_ASSOC);

if (!$job) {
  echo json_encode(["success" => false, "message" => "Job not found"]);
  exit();
}

if ($job["unassigned_from"] !== null && (int)$job["unassigned_from"] === (int)$accepted_by) {
  echo json_encode([
    "success" => false,
    "message" => "You cannot accept this job again after being unassigned.",
    "blocked" => true
  ]);
  exit();
}

    $code = rand(100000, 999999);
    $confirmationCode = rand(100000, 999999);

    $stmt = $pdo->prepare("
        UPDATE jobs 
        SET status = 'active', accepted_by = ?, completion_code = ?, confirmation_code = ?
        WHERE id = ? AND (status = 'pending' OR status = 'unassigned' OR status IS NULL)
    ");
    $stmt->execute([$accepted_by, $code, $confirmationCode, $job_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "code" => $code,
            "confirmationCode" => $confirmationCode,
            "message" => "Job accepted!"
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Job already taken"]);
    }

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}