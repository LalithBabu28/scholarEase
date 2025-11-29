import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', 
        dateOfBirth: '', aadharno: '', panno: '', mobileNo: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.registerStudent(formData);
            alert('Registration Successful! Please login.');
            navigate('/login');
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <h2>Student Registration</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Full Name" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <input name="dateOfBirth" type="date" placeholder="DOB" onChange={handleChange} required />
                <input name="aadharno" type="number" placeholder="Aadhar Number" onChange={handleChange} required />
                <input name="panno" placeholder="PAN Number" onChange={handleChange} required />
                <input name="mobileNo" type="number" placeholder="Mobile Number" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;