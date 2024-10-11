import React, { memo } from 'react';
import './register.css';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
    return (
        <div className="register-container">
            <h2>Đăng Ký</h2>
            <form>
                <div className="input-group">
                    <FaUser className="icon" />
                    <input type="text" placeholder="Tên đăng nhập" required />
                </div>
                <div className="input-group">
                    <FaEnvelope className="icon" />
                    <input type="email" placeholder="Email" required />
                </div>
                <div className="input-group">
                    <FaLock className="icon" />
                    <input type="password" placeholder="Mật khẩu" required />
                </div>
                <div className="input-group">
                    <FaLock className="icon" />
                    <input type="password" placeholder="Xác nhận mật khẩu" required />
                </div>
                <button type="submit">Đăng Ký</button>
            </form>
        </div>
    );
};

export default memo(Register);
