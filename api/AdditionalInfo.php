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
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!isset($data['user_id'])) {
    echo json_encode(["success" => false, "message" => "Missing user_id"]);
    exit;
}

$user_id = $data['user_id'];
$dob = $data['dob'] ?? null;
$gender = $data['gender'] ?? null;

try {
    // This SQL statement handles both "New User" and "User changing their info"
    $sql = "INSERT INTO account_info (user_id, `date of birth`, gender) 
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE 
            `date of birth` = VALUES(`date of birth`), 
            gender = VALUES(gender)";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$user_id, $dob, $gender]);

    echo json_encode(["success" => true, "message" => "Profile updated"]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "DB Error: " . $e->getMessage()]);
}
?>