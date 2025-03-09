<?php
header("Access-Control-Allow-Origin: *"); // Izinkan akses dari React
header("Content-Type: application/json"); // Set response type ke JSON

require_once "db.php"; // Menggunakan koneksi database dari file db.php

// Cek apakah koneksi database berhasil
if ($conn->connect_error) {
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit(); // Hentikan eksekusi script
}

// Query untuk mengambil data
$sql = "SELECT id, name, address,phone,email FROM owners"; // Sesuaikan dengan tabel database
$result = $conn->query($sql);

// Cek apakah query berhasil
if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => "Query failed: " . $conn->error
    ]);
    $conn->close(); // Tutup koneksi database
    exit(); // Hentikan eksekusi script
}

// Ambil data dari hasil query
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Tutup koneksi database
$conn->close();

// Kirim response JSON
echo json_encode([
    "status" => "success",
    "data" => $data
]);
?>