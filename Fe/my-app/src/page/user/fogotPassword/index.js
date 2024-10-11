import React, { memo } from 'react';
import './forgotPass.css';
import { FaEnvelope } from 'react-icons/fa';

const ForgotPassword = () => {
    return (
        <div className="forgot-password-container">
            <h2>Quên Mật Khẩu</h2>
            <form>
                <div className="input-group">
                    <FaEnvelope className="icon" />
                    <input type="email" placeholder="Email" required />
                </div>
                <button type="submit">Gửi Yêu Cầu</button>
            </form>
        </div>
    );
};

export default memo(ForgotPassword);
