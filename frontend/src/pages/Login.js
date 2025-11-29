import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const apiCall = isAdmin ? authService.loginAdmin : authService.loginStudent;
        const res = await apiCall(formData);
        login(res.data.token, res.data.userId, res.data.role);

        navigate(isAdmin ? "/admin" : "/student");
    } catch (err) {
        setError("Invalid credentials");
    }
};


    return (
        <div className="auth-container">
            <h2>{isAdmin ? 'Admin' : 'Student'} Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={isAdmin ? "Admin Name" : "Email"}
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p onClick={() => setIsAdmin(!isAdmin)} className="toggle-link">
                Switch to {isAdmin ? 'Student' : 'Admin'} Login
            </p>
        </div>
    );
};

export default Login;