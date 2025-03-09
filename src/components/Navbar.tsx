import React from "react";
import { Link } from "react-router-dom"; // Import Link untuk navigasi
import { useAuth } from "../contexts/AuthContext"; // Import useAuth untuk mendapatkan status login

const Navbar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth(); // Mengambil isAuthenticated dan logout dari useAuth

    return (
        <nav className="bg-blue-600 text-white px-4 py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-xl font-bold">My App</h1>
                {isAuthenticated && ( // Jika user login, tampilkan menu & tombol Logout
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/dashboard" className="hover:text-gray-300 transition">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/users" className="hover:text-gray-300 transition">
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-gray-300 transition">
                                About
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={logout}
                                className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
