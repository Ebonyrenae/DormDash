<?php

header ('Content-Type: application/json');
session_start();
require_once 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$jobId = $data['job_id'] ?? null;
$code = $data['code'] ?? null;

if (!$jobId || !$code) {
  echo json_encode(["success" => false, "message" => "Missing data"]);
  exit;
}

$sql = "SELECT completion_code FROM jobs WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$jobId]);
$job = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$job) {
  echo json_encode(["success" => false, "message" => "Job not found"]);
  exit;
}

if ($job['completion_code'] != $code) {
  echo json_encode(["success" => false, "message" => "Incorrect completion code"]);
  exit;
}

$update = $pdo->prepare("UPDATE jobs SET status = 'completed' WHERE id = ?");
$update->execute([$jobId]);

echo json_encode(["success" => true, "message" => "Job marked as completed"]);