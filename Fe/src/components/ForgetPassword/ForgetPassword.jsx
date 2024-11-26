import React, { useState } from 'react';
import './forget.css'
import VerifyUser from '../VerifyUsers/VerifyUser';

const ForgetPassword = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [isVerify, setIsVerify] = useState(false)
    const [formError, setFormError] = useState({})
    const [dataForgetPass, setDataForgetPass] = useState({
        email: '',
        newPassword: '',
        ReNewPassword: ''
    });

    // đọc và xử lý data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForgetPass((data) => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateData()) {
            setIsVerify(true);
            console.log("data", dataForgetPass);
        }
        else {
            console.log(formError)
        }
    }

    const closeOtp = () => {
        setIsVerify(false);
    }

    //check lỗi 
    const validateData = () => {
        const error = {};

        // Kiểm tra định dạng email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!dataForgetPass.email || !emailPattern.test(dataForgetPass.email)) {
            error.email = 'Email không đúng định dạng';
        }

        // Kiểm tra mật khẩu và nhập lại mật khẩu
        if (dataForgetPass.newPassword !== dataForgetPass.ReNewPassword) {
            error.confimPassword = 'Mật khẩu không khớp';
        }
        setFormError(error)

        return Object.keys(error).length === 0;
    };

    return (
        <div className='forgetpass-container'>
            <div className='forgetpass'>
                <h1>Đổi Mật Khẩu</h1>
                <div className='email'>
                    <p>Email</p>
                    <input
                        type="email"
                        className='email-input'
                        name='email'
                        onChange={handleChange}
                    />
                </div>
                {formError.email && (
                    <p className='error-feedback' style={{ marginLeft: "104px" }}>{formError.email}</p>
                )}
                <div className='pass-old'>
                    <p>Mật khẩu mới</p>
                    <input
                        type="password"
                        className='pass-old-input'
                        name='newPassword'
                        onChange={handleChange}
                    />
                </div>
                {formError.confimPassword && (
                    <p className='error-feedback' style={{ marginLeft: "72px" }}>{formError.confimPassword}</p>
                )}
                <div className='pass-new'>
                    <p>Nhập lại mật khẩu mới</p>
                    <input
                        type="password"
                        className='pass-new-input'
                        name='ReNewPassword'
                        onChange={handleChange}
                    />
                </div>
                {formError.confimPassword && (
                    <p className='error-feedback' style={{ marginLeft: "72px" }}>{formError.confimPassword}</p>
                )}
                <button type='submit' className='forgetpass-btn' onClick={handleSubmit}>Xác Nhận</button>
            </div>
            {isVerify && (
                <>
                <div
                    onClick={closeOtp}
                    style={{
                        position: "absolute",
                        zIndex: "10",
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(76, 79, 77, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        top: 0,
                        left: 0
                    }}>
                </div>
                <VerifyUser />
                </>
            )}
        </div>
    );
};

export default ForgetPassword;