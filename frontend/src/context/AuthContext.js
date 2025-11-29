import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUserId = localStorage.getItem("userId");
        const savedRole = localStorage.getItem("role");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const username = decoded.sub || decoded.username || decoded.email;
                const tokenRole = decoded.role; 

                setUser(username || null);
                setRole(savedRole || tokenRole || null);
                setUserId(savedUserId || decoded.userId || null);
            } catch (e) {
                console.error("Invalid token, clearing storage", e);
                localStorage.clear();
            }
        }
        setLoading(false);
    }, []);

    const login = (token, userIdFromApi, roleFromApi) => {
        localStorage.setItem("token", token);
        if (userIdFromApi) localStorage.setItem("userId", String(userIdFromApi));
        if (roleFromApi) localStorage.setItem("role", roleFromApi);

        try {
            const decoded = jwtDecode(token);
            const username = decoded.sub || decoded.username || decoded.email;
            const tokenRole = decoded.role; 

            setUser(username || null);
            setRole(roleFromApi || tokenRole || null);
            setUserId(userIdFromApi || decoded.userId || null);
        } catch (e) {
            console.error("Failed to decode token on login", e);
        }
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        setRole(null);
        setUserId(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, role, userId, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
