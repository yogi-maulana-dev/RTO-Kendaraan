<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db.php'; // Sesuaikan dengan koneksi database

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    echo json_encode(["success" => false, "message" => "ID tidak ditemukan"]);
    exit;
}

$id = intval($data->id);

$query = "DELETE FROM owners WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "User berhasil dihapus"]);
} else {
    echo json_encode(["success" => false, "message" => "Gagal menghapus user"]);
}

$stmt->close();
$conn->close();
?>