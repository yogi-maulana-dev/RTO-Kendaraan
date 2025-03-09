import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-600 text-white px-4 py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-xl font-bold">My App</h1>
                <ul className="flex space-x-4">
                    <li>
                        <a href="#" className="hover:text-gray-300 transition">Home</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-gray-300 transition">Users</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-gray-300 transition">About</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
