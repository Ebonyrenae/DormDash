
<?php

$host = 'localhost';
$dbname = 'cse442_2026_spring_team_i_db';
$username = 'ebonylaw';
$password = '50527781';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

?>





