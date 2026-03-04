<?php
header("Content-Type: application/json");

/* =========================
   CORS (MUST NOT USE * WITH CREDENTIALS)
   ========================= */
$allowed_origins = [
  "https://aptitude.cse.buffalo.edu",
  "https://cattle.cse.buffalo.edu",
  "http://localhost:5173"
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? "";
if (in_array($origin, $allowed_origins, true)) {
  header("Access-Control-Allow-Origin: $origin");
  header("Access-Control-Allow-Credentials: true");
  header("Vary: Origin");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

/* Preflight */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

/* =========================
   SESSION COOKIE SETTINGS
   =========================
   NOTE:
   - SameSite=None requires Secure=true (HTTPS).
   - This will work on aptitude (HTTPS).
   - For localhost (HTTP), Chrome may block SameSite=None cookies.
*/
$secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');

session_set_cookie_params([
  'lifetime' => 0,
  'path' => '/',
  'domain' => '',        // host-only cookie (recommended)
  'secure' => $secure,   // true on HTTPS
  'httponly' => true,
  'samesite' => $secure ? 'None' : 'Lax'
]);

session_start();

/* =========================
   DB
   ========================= */
$host = "localhost";
$user = "narde";
$pass = "50501035";
$db   = "cse442_2026_spring_team_i_db";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "db connection failed"]);
  exit;
}

/* Read JSON body */
$data = json_decode(file_get_contents("php://input"), true);
$identifier = $data["identifier"] ?? "";
$password   = $data["password"] ?? "";

if ($identifier === "" || $password === "") {
  echo json_encode(["success" => false, "message" => "missing identifier or password"]);
  exit;
}

/* Query user */
$stmt = $conn->prepare("SELECT id, username, email, password FROM users WHERE email=? OR username=?");
$stmt->bind_param("ss", $identifier, $identifier);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo json_encode(["success" => false, "message" => "user not found"]);
  exit;
}

$userRow = $result->fetch_assoc();

/* Verify password */
if (!password_verify($password, $userRow["password"])) {
  echo json_encode(["success" => false, "message" => "invalid password"]);
  exit;
}

/* Set session */
$_SESSION["user_id"] = (int)$userRow["id"];
$_SESSION["username"] = $userRow["username"];
$_SESSION["email"] = $userRow["email"];

echo json_encode([
  "success" => true,
  "user" => [
    "id" => (int)$userRow["id"],
    "username" => $userRow["username"],
    "email" => $userRow["email"]
  ]
]);