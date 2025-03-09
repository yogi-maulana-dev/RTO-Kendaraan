import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="app-container">
            <Navbar />
            <div className="content-container">
                <Outlet />
            </div>
        </div>
    );
};

export default ProtectedRoute;