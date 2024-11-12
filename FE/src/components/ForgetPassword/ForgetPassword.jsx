import React, { useState } from 'react';
import './forget.css'

const ForgetPassword = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage]= useState('');
    const [formError, setFormError] = useState({})
    const [email, setEmail] = useState('');         // Để lưu email người dùng nhập
    const [dataForgetPass, setDataForgetPass] = useState({
        otp : '',
        newPassword: '',
        ReNewPassword:''
    });

    // đọc và xử lý data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForgetPass((data) => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        if (validateData()) {
            console.log("email :" , email); 
        }
        else{
            console.log(formError)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateData()) {
            console.log("data" , dataForgetPass); 
        }
        else {
            console.log(formError)
        }
    }

    //check lỗi 
    const validateData = () => {
        const error = {};

        // Kiểm tra định dạng email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
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
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {formError.email && (
                    <p className='error-feedback' style={{marginLeft:"104px"}}>{formError.email}</p>
                )}
                <div className='confirm'>
                    <p>Mã xác thực</p>
                    <input
                        type="text"
                        className='confirm-input'
                        name='otp'
                        onChange={handleChange}
                    />
                    <button className='confirm-btn' onClick={handleSubmitEmail}>Gửi mã</button>
                </div>
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
                    <p className='error-feedback' style={{marginLeft:"72px"}}>{formError.confimPassword}</p>
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
                    <p className='error-feedback' style={{marginLeft:"72px"}}>{formError.confimPassword}</p>
                )}
                <button type='submit' className='forgetpass-btn' onClick={handleSubmit}>Xác Nhận</button>
            </div>
        </div>
    );
};

export default ForgetPassword;