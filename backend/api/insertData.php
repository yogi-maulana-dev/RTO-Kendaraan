<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once '../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['name']) && isset($data['email'])) {
    try {
        $stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
        $stmt->execute([$data['name'], $data['email']]);
        echo json_encode(["success" => true, "message" => "Data berhasil disimpan"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Invalid input"]);
}
?>