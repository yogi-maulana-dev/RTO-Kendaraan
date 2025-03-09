import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api"; // Gunakan ini sebagai base API

// services/api.ts
export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // Sesuaikan dengan field yang diharapkan backend
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Login failed",
      };
    }

    return {
      success: true,
      token: data.token, // Sesuaikan dengan field response dari backend
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Network error",
    };
  }
};

export interface User {
  id?: number;
  name: string;
  address: string;
  phone: string;
  email: string;
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

// Tambah data pengguna baru

// Fungsi untuk menambahkan user ke database
export const insertUser = async (userData: User) => {
  try {
    const response = await axios.post(`${BASE_URL}/insertData.php`, userData);
    return response.data; // Harus mengembalikan { success: boolean, message: string }
  } catch (error) {
    console.error("Error saat menambahkan user:", error);
    return { success: false, message: "Gagal menghubungi server" };
  }
};

// Fungsi untuk mengupdate data pengguna
export const updateUser = async (userData: User) => {
  try {
    const response = await axios.put(`${BASE_URL}/updateData.php`, userData);
    return response.data; // Harus mengembalikan { success: boolean, message: string }
  } catch (error) {
    console.error("Error saat mengupdate user:", error);
    return { success: false, message: "Gagal menghubungi server" };
  }
};

// Hapus user berdasarkan ID
export const deleteUser = async (
  id: number
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch(`${BASE_URL}/deleteData.php`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Terjadi kesalahan saat menghapus data:", error);
    return { success: false, message: "Gagal menghubungi server" };
  }
};
