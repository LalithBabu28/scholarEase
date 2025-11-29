import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, AuthContext } from './context/AuthContext';
import './App.css';

const ProtectedRoute = ({ children, allowedRole }) => {
    const { user, role, loading } = React.useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    // Not logged in → redirect
    if (!user) return <Navigate to="/login" />;

    // Role mismatch → block
    if (allowedRole && role !== allowedRole) return <Navigate to="/" />;

    return children;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <div className="main-container">
                    <Routes>
                        <Route path="/" element={
                            <div className="home-hero">
                                <h1>Scholarship Portal</h1>
                                <p>Apply for your future today.</p>
                            </div>
                        } />

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Student Route */}
                        <Route
                            path="/student"
                            element={
                                <ProtectedRoute allowedRole="STUDENT">
                                    <StudentDashboard />
                                </ProtectedRoute>
                            }
                        />

                        {}
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute allowedRole="ADMIN">
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
