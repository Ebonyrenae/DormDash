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
  exit();
}

require_once 'config.php';
// Set the response header to indicate that the response will be in JSON format


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

// Get the raw POST data and decode it from JSON
$receivedData = file_get_contents("php://input");
$data = json_decode($receivedData, true);

// Extract the data from the request
$userId = $data['userId'];
$university = $data['university'];

try {
    // Update the university in the database
        $sql = "INSERT INTO account_info (id, college)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE college = VALUES(college)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId, $university]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'University updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'No changes were made']);
    }
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>