<?php
header("Content-Type: application/json");
include '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare(
"INSERT INTO job_seekers
(name,email,phone,location,visa_type,job_type,industry,experience,message)
VALUES (?,?,?,?,?,?,?,?,?)"
);

$stmt->bind_param(
"sssssssss",
$data['name'],
$data['email'],
$data['phone'],
$data['location'],
$data['visaType'],
$data['jobType'],
$data['industry'],
$data['experience'],
$data['message']
);

$stmt->execute();

echo json_encode(["success" => true]);
