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

$user_id = $_GET["user_id"] ?? null;

if (!$user_id) {
  echo json_encode(["success" => false, "message" => "Missing user_id"]);
  exit;
}

try {
  $stmt = $pdo->prepare("
    SELECT reviews.rating, reviews.review_text, reviews.job_id,
           users.username as reviewer_name,jobs.service_type as service
    FROM reviews
    LEFT JOIN users ON reviews.reviewer_id = users.id
    LEFT JOIN jobs ON reviews.job_id = jobs.id
    WHERE reviews.reviewed_user_id = ?
    ORDER BY reviews.id DESC
  ");
  $stmt->execute([$user_id]);
  $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

  // Calculate average rating
  $avg = count($reviews) > 0
    ? round(array_sum(array_column($reviews, 'rating')) / count($reviews), 1)
    : null;

  echo json_encode([
    "success" => true,
    "reviews" => $reviews,
    "average_rating" => $avg,
    "total_reviews" => count($reviews)
  ]);
} catch (PDOException $e) {
  echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}