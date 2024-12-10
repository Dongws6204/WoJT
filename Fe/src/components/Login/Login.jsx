import React, { useState, useContext } from 'react';
import { FaUser } from "react-icons/fa";
import lockLogo from '../../assets/lock.png'
import './login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../ContextAPI/AuthContext";

const Login = () => {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useContext(AuthContext);
    const [dataLogin, setDataLogin] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/authentication/login', {
                user_name: dataLogin.username,
                pass_word: dataLogin.password,

            });
            setMessage(res.data.success);
            if (res.data.success) {
                window.alert('Đăng nhập thành công');
                login(res.data.customerId, res.data.role);
                navigate('/');
            } else {
                window.alert('Đăng nhập thất bại');
            }
        } catch (error) {
            console.error("Error", error);
            window.alert('Đã có lỗi xảy ra. Vui lòng thử lại.');
        }
    };


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
                    <FaUser style={{ marginRight: "8px" }} />
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