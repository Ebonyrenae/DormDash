<?php
// get_user.php
header("Content-Type: application/json");

/* =========================
   1. DYNAMIC CORS (Matches your me.php)
   ========================= */
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
  exit();
}

/* =========================
   2. DATABASE QUERY
   ========================= */
require_once __DIR__ . '/config.php';

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(["success" => false, "message" => "No ID provided"]);
    exit;
}

try {
    // We fetch the profile-specific columns your React code uses
    $stmt = $pdo->prepare("SELECT id, username, email, university, program, bio, experience, profile_photo FROM users WHERE id = ?");
    $stmt->execute([$id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Handle the 'experience' JSON column so React gets an array, not a string
        if (isset($user['experience']) && is_string($user['experience'])) {
            $user['experience'] = json_decode($user['experience'], true) ?: [];
        } elseif (!isset($user['experience'])) {
            $user['experience'] = [];
        }

        echo json_encode(["success" => true, "user" => $user]);
    } else {
        echo json_encode(["success" => false, "message" => "User not found"]);
    }
} catch (PDOException $e) {
    // Use a generic message for production, or $e->getMessage() for debugging
    echo json_encode(["success" => false, "message" => "Database error"]);
}