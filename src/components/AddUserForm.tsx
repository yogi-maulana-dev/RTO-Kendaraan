import React, { useState } from "react";
import { insertUser } from "../services/api"; // Pastikan path sesuai dengan lokasi services.ts

import Swal from "sweetalert2";

const AddUserForm: React.FC<{ onUserAdded: () => void }> = ({ onUserAdded }) => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false); // State untuk mencegah klik ganda

    // Fungsi menangani perubahan input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isSubmitting) return; // Cegah perubahan jika sedang submit
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Fungsi menangani submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true); // Mencegah klik ganda

        console.log("Mengirim data ke API:", formData); // Debugging

        try {
            const result = await insertUser(formData);
            console.log("Response dari API:", result); // Debugging

            if (result?.success) {
                setFormData({ name: "", address: "", phone: "", email: "" }); // Reset form
                onUserAdded(); // Refresh daftar pengguna

                // alert("Data berhasil ditambahkan!"); // Tampilkan alert
                await Swal.fire({
                    icon: "success",
                    title: "Sukses",
                    text: "Data berhasil ditambahkan!",
                });
            } else {
                await Swal.fire({
                    icon: "warning",
                    title: "Gagal",
                    text: "Gagal Data ditambahkan!",
                });
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            alert("Gagal menambahkan data.");
        } finally {
            setIsSubmitting(false); // Aktifkan kembali form
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-blue-600">Tambah Pengguna</h2>
            <div className="grid grid-cols-1 gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Nama"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded-md"
                    required
                    disabled={isSubmitting} // Cegah input jika sedang submit
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Alamat"
                    value={formData.address}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded-md"
                    required
                    disabled={isSubmitting}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="No. HP"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded-md"
                    required
                    disabled={isSubmitting}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded-md"
                    required
                    disabled={isSubmitting}
                />
                <button
                    type="submit"
                    className={`px-4 py-2 rounded-md text-white transition ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    disabled={isSubmitting} // Tombol dinonaktifkan jika sedang submit
                >
                    {isSubmitting ? "Menambahkan..." : "Tambah"}
                </button>
            </div>
        </form>
    );
};

export default AddUserForm;