<?php
header('Content-Type: application/json');
//change made
$isHttps = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off") || 
           ($_SERVER['SERVER_PORT'] == 443);

session_set_cookie_params([
  'lifetime' => 0,
  'path' => '/',
  'secure'   => $isHttps, 
  'httponly' => true,
  'samesite' => $isHttps ? 'None' : 'Lax' 
]);

// 2. START SESSION: Now it uses the settings above
session_start();

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
// Get raw data from the frontend and decode it from JSON format into a PHP associative array. 
// The file_get_contents("php://input") function reads the raw data from the request body, and json_decode() converts the 
// JSON string into a PHP array for easier access to the individual fields.
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Validate input
if (!isset($data['user_id'])) {
    echo json_encode([
        "success" => false,
        "message" => "User ID missing: " .( $data['user_id'] ?? "nothing provided")
    ]);
    exit;
}


$user_id = $data['user_id'];
$college = $data['college'] ?? null;
$major_id = $data['major_id'] ?? null;
$year_in_school = $data['year_in_school'] ?? null;
$custom_major = $data['custom_major'] ?? null;

try {

    $sql1= "SELECT majorName FROM majors WHERE id = ?";
    $stmt1 = $pdo->prepare($sql1);
    $stmt1->execute([$major_id]);
    $row = $stmt1->fetch(PDO::FETCH_ASSOC);
    $majorName = $row['majorName'];


    // Store academic info on the users row
    // Note: UI sends `college`; users table uses `university`
    $sql = "UPDATE users 
            SET university = ?, major_id = ?, year_in_school = ?
            WHERE id = ?";
     $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $college,      
        $major_id,     
        $year_in_school,
        $user_id
    ]);
   

    echo json_encode([
        "success" => true,
        "message" => "Academic information saved successfully"
    ]);
    exit;

} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}

?>
