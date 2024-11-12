import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import lockLogo from '../../assets/lock.png'
import './login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [dataLogin, setDataLogin] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("formdata" , dataLogin); 
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataLogin((data) => ({
            ...data,
            [name]: value
        }));
    };

    return (
        <div className='login-container'>
            <div className='login'>
                <h2>Đăng Nhập</h2>
                <div className='name'>
                    <input
                        type="text"
                        className='input'
                        placeholder='UserName...'
                        name='username'
                        onChange={handleChange}
                    />
                    <FaUser style={{marginRight:"8px"}}/>
                </div>
                <div className='pass'>
                    <input
                        type='password'
                        className='input'
                        placeholder='PassWord...'
                        name='password'
                        onChange={handleChange}
                    />
                    <img className='icon-login' src={lockLogo} />
                </div>
                <p className='forgot-pass' onClick={() => navigate('/forget_pass')}>Quên Mật Khẩu?</p>
                <button type='submit' className='login-btn' onClick={handleSubmit}>Đăng Nhập</button>
                <div className='register-option'>
                    <p>Bạn chưa có tài khoản?</p>
                    <p className='register-option_1' style={{ fontWeight: 'bold' }} onClick={() => navigate('/register')}>Đăng ký ngay</p>
                </div>
            </div>
        </div>
    );
};

export default Login;