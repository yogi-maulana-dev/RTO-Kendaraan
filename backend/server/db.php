<?php
$servername = "localhost";
$username = "root"; // Ganti dengan username database Anda
$password = "yrka1234"; // Ganti dengan password database Anda
$dbname = "rto"; // Ganti dengan nama database Anda

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>