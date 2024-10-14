import { memo, useContext, useState } from "react";


import React from 'react';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { ContextCheckLogin } from "../../../router";

const Login = () => {
    const { checkLogin, setCheckLogin } = useContext(ContextCheckLogin);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Kiểm tra tài khoản và mật khẩu ở đây
        if (username === 'abcxyz' && password === '2004') {

            setCheckLogin(true);
            alert('Đăng nhập thành công!');
        } else {
            alert('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    };

    return (
        <div className="login-container">
            <h2>Đăng Nhập</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <FaUser className="icon" />
                    <input type="text" placeholder="Tên đăng nhập" value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-group">
                    <FaLock className="icon" />
                    <input type="password" placeholder="Mật khẩu" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
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