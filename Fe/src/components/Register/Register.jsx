import React, { useState } from 'react';
import './register.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import VerifyUser from '../VerifyUsers/VerifyUser';
import axios from 'axios';


const Register = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [formError, setFormError] = useState({})
    const [selectedDate, setSelectedDate] = useState(null);
    const [isVerify, setIsVerify] = useState(false);
    const [dataRegister, setDataRegister] = useState({
        name: '',
        email: '',
        date: '',
        phone: '',
        address: '',
        username: '',
        password: '',
        repassword: ''
    });

    // Hàm chuẩn hóa dữ liệu
    const normalizeData = (data) => {
        return {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            birthday: data.date,
            // birthday: new Date(data.date).toISOString().split('T')[0], // Chuyển đổi ngày sinh thành định dạng YYYY-MM-DD
            pass_word: data.password,
            user_name: data.username
        };
    };

    // Ví dụ sử dụng hàm chuẩn hóa




    //check lỗi 
    const validateData = () => {
        const error = {};

        // Kiểm tra định dạng email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!dataRegister.email || !emailPattern.test(dataRegister.email)) {
            error.email = 'Email không đúng định dạng';
        }

        // Kiểm tra độ dài số điện thoại
        if (!dataRegister.phone || dataRegister.phone.length !== 10) {
            error.phone = 'Số điện thoại phải có 10 ký tự';
        }

        // Kiểm tra mật khẩu và nhập lại mật khẩu
        if (dataRegister.password !== dataRegister.repassword) {
            error.confimPassword = 'Mật khẩu không khớp';
        }

        // Kiểm tra độ dài username
        if (!dataRegister.username || dataRegister.username.length < 6 || dataRegister.username.length > 9) {
            error.username = 'Tên đăng nhập phải có từ 6 đến 9 ký tự';
        }

        setFormError(error)

        return Object.keys(error).length === 0;
    };



    // đọc và xử lý data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataRegister((data) => ({
            ...data,
            [name]: value
        }));
    };

    // Hàm xử lý khi chọn ngày
    const handleDateChange = (date) => {
        setSelectedDate(date); // Cập nhật selectedDate
        setDataRegister((data) => ({
            ...data,
            date: date
                ? new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                    .toISOString()
                    .split('T')[0] // Chuẩn hóa múi giờ trước khi chuyển sang chuỗi
                : ''
        }));
    };


    const closeOtp = () => {
        setIsVerify(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateData()) {
            try {
                const response = axios.post(`${import.meta.env.VITE_API_URL}/authentication/register`, {
                    user_name: dataRegister.username,
                    email: dataRegister.email,
                });

                console.log("API response:", dataRegister.username, dataRegister.email);

                setMessage('Gửi thành công!');
                setIsVerify(true); // Hiện modal OTP hoặc xác minh nếu cần
            } catch (error) {
                console.error("Error during API call:", error);

                // Kiểm tra phản hồi lỗi và trích xuất thông báo
                const errorMessage = error.response?.data?.error || "Đã xảy ra lỗi không xác định.";

                // Xử lý phần chi tiết lỗi
                const errorDetailsObject = error.response?.data?.details;
                let errorDetails = "";

                if (errorDetailsObject) {
                    // Biến đổi đối tượng details thành chuỗi
                    errorDetails = Object.entries(errorDetailsObject)
                        .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
                        .join("\n");
                }

                // Hiển thị lỗi trong alert
                window.alert(`Lỗi: ${errorMessage}\nChi tiết:\n${errorDetails}`);
                window.alert('looix');

                // Ghi log hoặc cập nhật trạng thái lỗi trong UI nếu cần
                setErrorMessage(errorMessage);
            }
        } else {
            console.log(formError); // Nếu validateData thất bại, ghi log lỗi validate
        }
    };



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (validateData()) {
    //         setIsVerify(true)
    //         console.log("formdata", dataRegister);
    //     }
    //     else {
    //         console.log(formError)
    //     }
    // }

    return (
        <div className='register-container'>
            <div className='register'>
                <h1>Đăng Ký</h1>
                <div className='register-name'>
                    <input
                        type="text"
                        className='input'
                        placeholder='Họ và tên...'
                        name='name'
                        onChange={handleChange}
                    />
                </div>
                <div className='register-email'>
                    <input type="email" className='input' placeholder='Email...' name='email' onChange={handleChange} />
                </div>
                {formError.email && (
                    <p className='error-feedback' style={{ marginRight: "142px" }}>{formError.email}</p>
                )}
                <div className='register-date'>
                    <DatePicker
                        selected={selectedDate}
                        placeholderText="Ngày sinh..."
                        className='input'
                        dateFormat="dd/MM/yyyy" // Format ngày tùy chỉnh
                        onChange={handleDateChange}
                    />
                </div>
                <div className='register-phone'>
                    <input type="text" className='input' placeholder='Số điện thoại...' name='phone' onChange={handleChange} />
                </div>
                {formError.phone && (
                    <p className='error-feedback' style={{ marginRight: "136px" }}>{formError.phone}</p>
                )}
                <div className='register-address'>
                    <input type="text" className='input' placeholder='Địa chỉ...' name='address' onChange={handleChange} />
                </div>
                <div className='register-username'>
                    <input type="text" className='input' placeholder='Tên đăng nhập...' name='username' onChange={handleChange} />
                </div>
                {formError.username && (
                    <p className='error-feedback' style={{ marginRight: "91px" }}>{formError.username}</p>
                )}
                <div className='register-pass'>
                    <input type="password" className='input' placeholder='Mật khẩu...' name='password' onChange={handleChange} />
                </div>
                {formError.confimPassword && (
                    <p className='error-feedback' style={{ marginRight: "169px" }}>{formError.confimPassword}</p>
                )}
                <div className='register-repass'>
                    <input type="password" className='input' placeholder='Nhập Lại Mật khẩu...' name='repassword' onChange={handleChange} />
                </div>
                {formError.confimPassword && (
                    <p className='error-feedback' style={{ marginRight: "169px" }}>{formError.confimPassword}</p>
                )}
                <button type='submit' className='register-btn' onClick={handleSubmit}>Đăng Ký</button>
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
                    <VerifyUser dataRegisterArr={normalizeData(dataRegister)} />
                </>
            )}
        </div>
    );
};

export default Register;
