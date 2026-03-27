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
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}

// 2. Handle preflight request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// 3. Only allow POST
$method = $_SERVER["REQUEST_METHOD"];

if ($method !== "POST") {
    // TEMP: allow debugging
    // comment this out for now
    // exit();
}
    


require_once 'config.php';

try {

    // 4. Read JSON body properly
    $raw = file_get_contents("php://input");
    $body = json_decode($raw, true);

    if (!$body) {
        echo json_encode([
            "success" => false,
            "message" => "Invalid JSON"
        ]);
        exit();
    }

    $job_id = $body["job_id"] ?? null;
    $accepted_by = $body["accepted_by"] ?? null;

    // 5. Validate input
    if (!$job_id || !$accepted_by) {
        echo json_encode([
            "success" => false,
            "message" => "Missing data"
        ]);
        exit();
    }

    $code = rand(1000, 9999);


    // 6. Update job
    $sql = "UPDATE jobs 
            SET status = 'active', accepted_by = ?, completion_code = ?
            WHERE id = ?";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$accepted_by, $code, $job_id]);

    // 7. Check result
    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "code" => $code,
            "message" => "Job accepted!"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Job not found or already active"
        ]);
    }

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}