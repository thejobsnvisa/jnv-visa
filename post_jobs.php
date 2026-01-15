<?php
header("Content-Type: application/json");
include '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare(
"INSERT INTO post_jobs
(business_name,contact_person,email,phone,job_title,job_location,employment_type,sponsorship,message)
VALUES (?,?,?,?,?,?,?,?,?)"
);

$stmt->bind_param(
"sssssssss",
$data['business_name'],
$data['contact_person'],
$data['email'],
$data['phone'],
$data['job_title'],
$data['job_location'],
$data['employment_type'],
$data['sponsorship'],
$data['message']
);

$stmt->execute();

echo json_encode(["success" => true]);
