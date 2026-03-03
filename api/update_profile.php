<?php
header("Content-Type: application/json");

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
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(200);
  exit();
}

$secure = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off");
session_set_cookie_params([
  "lifetime" => 0,
  "path" => "/",
  "secure" => $secure,
  "httponly" => true,
  "samesite" => $secure ? "None" : "Lax",
]);
session_start();

if (!isset($_SESSION["user_id"])) {
  http_response_code(401);
  echo json_encode(["success" => false, "message" => "Not logged in"]);
  exit;
}

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(["success" => false, "message" => "Invalid JSON"]);
  exit;
}

$username = isset($data["username"]) ? trim((string)$data["username"]) : "";
if ($username === "") {
  echo json_encode(["success" => false, "message" => "Username is required"]);
  exit;
}

$userId = (int)$_SESSION["user_id"];
require_once __DIR__ . "/config.php";

$profileColumnsMissing = false;

try {
  // Always update username (and session)
  $stmt = $pdo->prepare("UPDATE users SET username = ? WHERE id = ?");
  $stmt->execute([$username, $userId]);
  $_SESSION["username"] = $username;

  $user = [
    "id" => $userId,
    "username" => $username,
    "email" => $_SESSION["email"] ?? null,
  ];

  // Optional: update profile columns if they exist
  try {
    $university = isset($data["university"]) ? trim((string)$data["university"]) : "";
    $program = isset($data["program"]) ? trim((string)$data["program"]) : "";
    $bio = isset($data["bio"]) ? trim((string)$data["bio"]) : "";
    $experience = isset($data["experience"]) && is_array($data["experience"])
      ? $data["experience"] : [];
    $experience = array_values(array_filter($experience, function ($e) {
      return (isset($e["emoji"]) && trim((string)$e["emoji"]) !== "") ||
             (isset($e["label"]) && trim((string)$e["label"]) !== "");
    }));
    $experienceJson = json_encode($experience);

    $stmt = $pdo->prepare("UPDATE users SET university = ?, program = ?, bio = ?, experience = ? WHERE id = ?");
    $stmt->execute([$university, $program, $bio, $experienceJson, $userId]);

    $user["university"] = $university;
    $user["program"] = $program;
    $user["bio"] = $bio;
    $user["experience"] = $experience;

    $sel = $pdo->prepare("SELECT profile_photo FROM users WHERE id = ?");
    $sel->execute([$userId]);
    $r = $sel->fetch(PDO::FETCH_ASSOC);
    if ($r && !empty($r["profile_photo"])) {
      $user["profilePhoto"] = $r["profile_photo"];
    }
  } catch (Exception $e) {
    $profileColumnsMissing = true;
  }

  echo json_encode([
    "success" => true,
    "user" => $user,
    "profileColumnsMissing" => $profileColumnsMissing,
  ]);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(["success" => false, "message" => "Database error"]);
}
