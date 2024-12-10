import React, { createContext, useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { initializeCart } from '../redux/Slice/cartSlice';


// Tạo AuthContext
export const AuthContext = createContext();

// Tạo Provider
export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(() => {
        const savedAuth = localStorage.getItem("authState");
        return savedAuth ? JSON.parse(savedAuth) : { isAuthenticated: false, userId: null };
    });

    const dispatch = useDispatch();

    // Hàm cập nhật trạng thái đăng nhập
    const login = (userId) => {
        const newState = { isAuthenticated: true, userId };
        setAuthState(newState);
        localStorage.setItem("authState", JSON.stringify(newState));
    };

    // Hàm đăng xuất
    const logout = () => {
        setAuthState({
            isAuthenticated: false,
            userId: null,
        });
        localStorage.removeItem("authState");
    };

    useEffect(() => {
        const savedAuth = localStorage.getItem("authState");
        if (savedAuth) {
            setAuthState(JSON.parse(savedAuth));
        }
    }, []);

    useEffect(() => {
        dispatch(initializeCart({ userId: authState.userId }));
    }, [authState.userId, dispatch]);

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
