// src/components/Dashboard/Dashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const Dashboard: React.FC = () => {
    // Data dummy untuk contoh
    const stats = [
        { title: 'Total Pengguna', value: '1,234', icon: '👥', trend: '+12%' },
        { title: 'Aktivitas Hari Ini', value: '89', icon: '📈', trend: '+5%' },
        { title: 'Proyek Aktif', value: '45', icon: '📦', trend: '-3%' },
    ];

    const recentActivities = [
        { id: 1, user: 'John Doe', action: 'Menambahkan pengguna baru', time: '5 menit lalu' },
        { id: 2, user: 'Jane Smith', action: 'Memperbarui profil', time: '2 jam lalu' },
        { id: 3, user: 'Bob Johnson', action: 'Menghapus data', time: '1 hari lalu' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Utama</h1>

                {/* Statistik Cepat */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-4xl">{stat.icon}</span>
                                    <h3 className="text-lg text-gray-500 mt-2">{stat.title}</h3>
                                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                </div>
                                <span className="text-green-500 font-semibold">{stat.trend}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Grafik dan Konten Utama */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Grafik */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Aktivitas Terkini</h2>
                        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400">Grafik akan ditampilkan di sini</span>
                        </div>
                    </div>

                    {/* Aktivitas Terbaru */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Aktivitas Terakhir</h2>
                        <div className="space-y-4">
                            {recentActivities.map(activity => (
                                <div
                                    key={activity.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                >
                                    <div>
                                        <p className="font-medium text-gray-800">{activity.user}</p>
                                        <p className="text-gray-600 text-sm">{activity.action}</p>
                                    </div>
                                    <span className="text-sm text-gray-500">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <Link
                        to="/users"
                        className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                    >
                        <span className="text-2xl">👥</span>
                        <p className="mt-2 font-medium">Kelola Pengguna</p>
                    </Link>

                    <Link
                        to="/profile"
                        className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                    >
                        <span className="text-2xl">👤</span>
                        <p className="mt-2 font-medium">Profil Saya</p>
                    </Link>

                    <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                        <span className="text-2xl">⚙️</span>
                        <p className="mt-2 font-medium">Pengaturan</p>
                    </div>

                    <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                        <span className="text-2xl">📊</span>
                        <p className="mt-2 font-medium">Laporan</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;