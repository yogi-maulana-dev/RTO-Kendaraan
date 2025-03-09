import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import Swal from 'sweetalert2';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await login(username, password);

        if (result.success) {
            Swal.fire('Success!', 'Login successful!', 'success');
            navigate('/');
        } else {
            Swal.fire('Error!', result.message || 'Invalid credentials', 'error');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                {/* ... form elements ... */}
            </form>
        </div>
    );
};

export default Login;