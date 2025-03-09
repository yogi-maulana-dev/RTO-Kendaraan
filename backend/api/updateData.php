<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Tangani preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once(__DIR__ . "/db.php"); // Pastikan path config sudah benar

// Deteksi metode yang digunakan (fallback ke POST dengan _method=PUT)
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST' && isset($_POST['_method']) && $_POST['_method'] === 'PUT') {
    $method = 'PUT';
}

// Cek apakah request menggunakan metode PUT
if ($method !== 'PUT') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Metode tidak diizinkan"]);
    exit();
}

// Ambil data JSON dari body request
$data = json_decode(file_get_contents("php://input"), true);

// Validasi data
if (!isset($data['id'], $data['name'], $data['address'], $data['phone'], $data['email'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Data tidak lengkap"]);
    exit();
}

// Ambil data dari request dan sanitasi
$id = intval($data['id']);
$name = htmlspecialchars(strip_tags($data['name']));
$address = htmlspecialchars(strip_tags($data['address']));
$phone = htmlspecialchars(strip_tags($data['phone']));
$email = htmlspecialchars(strip_tags($data['email']));

// Perbarui data di database
$sql = "UPDATE owners SET name=?, address=?, phone=?, email=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssi", $name, $address, $phone, $email, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Data berhasil diperbarui"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Gagal memperbarui data"]);
}

// Tutup koneksi
$stmt->close();
$conn->close();
?>