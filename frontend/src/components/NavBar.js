import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
    const { user, role, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">Scholar Ease</Link>
                <div className="nav-links">
                    {!user ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    ) : (
                        <>
                            {role === 'ADMIN' && <Link to="/admin"></Link>}
                            {role === 'STUDENT' && <Link to="/student"></Link>}
                            <button onClick={logout} className="logout-btn">Logout ({user})</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;