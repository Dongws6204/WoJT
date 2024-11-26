import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import './profile.css'
import VerifyUser from '../../components/VerifyUsers/VerifyUser';


const Profile = () => {

    const value = {
        name: 'Vo Quang Sang',
        email: 'sangv6548@gmail.com',
        date: '2003-12-15',
        phone: '0974583072',
        address: 'nghi xuan ha tinh',
        username: 'Sann525'
    }

    const [isVerify, setIsVerify] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date(value.date));
    const [active, setActive] = useState(false);
    const [formError, setFormError] = useState({})
    const [dataProfile, setdataProfile] = useState({
        name: '',
        email: '',
        date: '',
        phone: '',
        address: '',
        username: '',
    });
    useEffect(() => {
        setdataProfile(value);
    }, []);

    const closeOtp = () => {
        setIsVerify(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActive(true);
        setdataProfile((data) => ({
            ...data,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setSelectedDate(date); // Cập nhật selectedDate
        setActive(true);
        setdataProfile((data) => ({
            ...data,
            date: date ? date.toLocaleDateString('en-GB') : '' // Chuyển định dạng ngày thành chuỗi (dd/MM/yyyy)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateData() && active) {
            setActive(false);
            setIsVerify(true);
            console.log("formdata", dataProfile);
        }
        else {
            console.log(formError)
        }
    }

    const validateData = () => {
        const error = {};

        // Kiểm tra định dạng email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!dataProfile.email || !emailPattern.test(dataProfile.email)) {
            error.email = 'Email không đúng định dạng';
        }

        // Kiểm tra độ dài số điện thoại
        if (!dataProfile.phone || dataProfile.phone.length !== 10) {
            error.phone = 'Số điện thoại phải có 10 ký tự';
        }

        // Kiểm tra độ dài username
        if (!dataProfile.username || dataProfile.username.length < 6 || dataProfile.username.length > 9) {
            error.username = 'Tên đăng nhập phải có từ 6 đến 9 ký tự';
        }

        setFormError(error)

        return Object.keys(error).length === 0;
    };

    return (
        <div className='profile-container'>
            <h1>Thông tin khách hàng</h1>
            <div className='proflie_list'>
                <p>Họ và tên</p>
                <input type="text" value={dataProfile.name} onChange={handleChange} name='name' />
            </div>
            <div className='proflie_list'>
                <p>Tên đăng nhập</p>
                <input type="text" value={dataProfile.username} onChange={handleChange} name='username' />
            </div>
            {formError.username && (
                <p className='error-feedback' style={{ fontSize:'12px',marginBottom:'8px',fontFamily:'Montserrat' }}>{formError.username}</p>
            )}
            <div className='proflie_list'>
                <p>Số điện thoại</p>
                <input type="text" value={dataProfile.phone} onChange={handleChange} name='phone' />
            </div>
            {formError.phone && (
                <p className='error-feedback' style={{ fontSize:'12px',marginBottom:'8px',fontFamily:'Montserrat' }}>{formError.phone}</p>
            )}
            <div className='proflie_list'>
                <p>Email</p>
                <input type="text" value={dataProfile.email} onChange={handleChange} name='email' />
            </div>
            {formError.email && (
                <p className='error-feedback' style={{ fontSize:'12px',marginBottom:'8px',fontFamily:'Montserrat' }}>{formError.email}</p>
            )}
            <div className='proflie_list'>
                <p>Địa chỉ</p>
                <input type="text" value={dataProfile.address} onChange={handleChange} name='address' />
            </div>
            <div className='proflie_list_date'>
                <p>Sinh nhật</p>
                <DatePicker
                    placeholder={dataProfile.date}
                    selected={selectedDate}
                    className='input'
                    dateFormat="dd/MM/yyyy" // Format ngày tùy chỉnh
                    onChange={handleDateChange}
                />

            </div>
            <button className={`profile_btn ${active ? 'active' : ''}`} onClick={handleSubmit}>Lưu thay đổi</button>
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

export default Profile;