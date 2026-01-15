<?php
$conn = new mysqli("localhost", "root", "", "jobportal");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}
?>
