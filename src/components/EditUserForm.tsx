import React, { useState } from "react";
import { User } from "../services/api";

interface EditUserFormProps {
    user: User;
    onUpdateUser: (updatedUser: User) => void;
    onCancel: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onUpdateUser, onCancel }) => {
    const [updatedUser, setUpdatedUser] = useState<User>({ ...user });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateUser(updatedUser);
    };

    return (
        <div className="p-4 border rounded-md bg-white shadow-md mb-4">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Edit Pengguna</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label className="block font-medium">Nama</label>
                    <input
                        type="text"
                        name="name"
                        value={updatedUser.name}
                        onChange={handleChange}
                        className="p-2 border rounded-md w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block font-medium">Alamat</label>
                    <input
                        type="text"
                        name="address"
                        value={updatedUser.address}
                        onChange={handleChange}
                        className="p-2 border rounded-md w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block font-medium">No. HP</label>
                    <input
                        type="text"
                        name="phone"
                        value={updatedUser.phone}
                        onChange={handleChange}
                        className="p-2 border rounded-md w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={updatedUser.email}
                        onChange={handleChange}
                        className="p-2 border rounded-md w-full"
                    />
                </div>
                <div className="flex gap-2 mt-4">
                    <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                        Simpan
                    </button>
                    <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500">
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUserForm;
