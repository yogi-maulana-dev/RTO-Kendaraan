<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once(__DIR__ . "/db.php"); // Pastikan path config sudah benar

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || empty($data['name']) || empty($data['address']) || empty($data['phone']) || empty($data['email'])) {
    echo json_encode(["success" => false, "message" => "Data tidak lengkap", "received_data" => $data]);
    exit;
}

// Debugging: Cek apakah koneksi ke database berhasil
if (!$conn) {
    echo json_encode(["success" => false, "message" => "Koneksi database gagal"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO owners (name, address, phone, email) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $data['name'], $data['address'], $data['phone'], $data['email']);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Data berhasil ditambahkan"]);
} else {
    echo json_encode(["success" => false, "message" => "Gagal menambahkan data: " . $conn->error]);
}
?>