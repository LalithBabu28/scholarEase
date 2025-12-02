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
            
            <form onSubmit={handleSubmit} className="form-fields">

                <label>Full Name</label>
                <input 
                    name="name" 
                    placeholder="Enter full name" 
                    onChange={handleChange} 
                    required 
                />

                <label>Email</label>
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Enter email" 
                    onChange={handleChange} 
                    required 
                />

                <label>Password</label>
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Enter password" 
                    onChange={handleChange} 
                    required 
                />

                <label>Date of Birth</label>
                <input 
                    name="dateOfBirth" 
                    type="date" 
                    onChange={handleChange} 
                    required 
                />

                <label>Aadhar Number</label>
                <input 
                    name="aadharno" 
                    type="number" 
                    placeholder="Enter Aadhar number" 
                    onChange={handleChange} 
                    required 
                />

                <label>PAN Number</label>
                <input 
                    name="panno" 
                    placeholder="Enter PAN number" 
                    onChange={handleChange} 
                    required 
                />

                <label>Mobile Number</label>
                <input 
                    name="mobileNo" 
                    type="number" 
                    placeholder="Enter mobile number" 
                    onChange={handleChange} 
                    required 
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
