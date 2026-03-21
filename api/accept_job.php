<?php
// 1. Headers for CORS and JSON
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
    header("Access-Control-Allow-Methods: POST, OPTIONS"); // Use POST here
    header("Access-Control-Allow-Headers: Content-Type");
}

// 2. Handle Preflight
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// 3. Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
    exit();
}

require_once 'config.php';

try {
    // 4. Get the JSON body
    $body = json_decode(file_get_contents("php://input"), true);
    $job_id = $body["job_id"] ?? null;
    $accepted_by = $body["accepted_by"] ?? null;

    if (!$job_id) {
        echo json_encode(["success" => false, "message" => "Job ID is missing"]);
        exit();
    }

    // 5. Update the job status
    // Note: In a real app, you'd also want to save WHO accepted it (worker_id)
    $sql = "UPDATE jobs SET status = 'active', accepted_by = ? WHERE id = ?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$accepted_by, $job_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => true, "message" => "Job accepted!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Job not found or already active"]);
    }

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}