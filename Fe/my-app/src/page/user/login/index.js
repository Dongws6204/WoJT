import { memo } from "react";


import React from 'react';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
    return (
        <div className="login-container">
            <h2>Đăng Nhập</h2>
            <form>
                <div className="input-group">
                    <FaUser className="icon" />
                    <input type="text" placeholder="Tên đăng nhập" />
                </div>
                <div className="input-group">
                    <FaLock className="icon" />
                    <input type="password" placeholder="Mật khẩu" />
                </div>
                <div className="forgot-password">
                    <a href="/forgot-password">Quên mật khẩu?</a>
                </div>
                <button type="submit">Đăng Nhập</button>
                <div className="register-link">
                    <p>Chưa có tài khoản? <a href="/register">Đăng ký</a></p>
                </div>
            </form>
        </div>
    );
};

export default memo(Login);