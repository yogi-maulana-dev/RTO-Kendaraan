import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api"; // Gunakan ini sebagai base API

export interface User {
  id: number;
  name: string;
}

// Ambil status database (cek apakah koneksi MySQL berjalan)
export const getDatabaseStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/db.php`);
    return response.data; // Pastikan response memiliki struktur { status: "success", message: "Database connected" }
  } catch (error) {
    console.error("Error fetching database status:", error);
    return { status: "error", message: "Database connection failed" };
  }
};

// Ambil data users
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/getData.php`);
    return response.data.data; // Pastikan response memiliki struktur { data: User[] }
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
