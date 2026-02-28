<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");


require_once 'config.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
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


    $sql = "UPDATE account_info 
            SET college = ?, major_id = ?, year_in_school = ?, custom_major = ?
            WHERE user_id = ?";
     $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $college,      
        $major_id,     
        $year_in_school,        
        $custom_major, 
        $user_id      ]);
   

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