<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


require_once 'config.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // 1. Define the SQL string FIRST
    $sql = "SELECT id, majorName AS field FROM majors ORDER BY majorName ASC";

    // 2. Execute the query using the $pdo object
    $stmt = $pdo->query($sql);

    // 3. Fetch all results into an associative array
    $majors = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 4. Output as JSON
    echo json_encode($majors);

} catch (PDOException $e) {
    // Handle errors gracefully
    echo json_encode(["error" => $e->getMessage()]);
}
?>