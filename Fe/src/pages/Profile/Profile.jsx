import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import './profile.css'
import VerifyUser from '../../components/VerifyUsers/VerifyUser';
import axios from 'axios';
import { AuthContext } from '../../ContextAPI/AuthContext';

const Profile = () => {
    const { authState } = useContext(AuthContext);
    const [dataProfile, setdataProfile] = useState({
        name: '',
        email: '',
        birthday: '',
        phone: '',
        address: '',
        user_name: '',
    });

    // const [isVerify, setIsVerify] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [active, setActive] = useState(false);
    const [formError, setFormError] = useState({});

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/customers/${authState.userId}`);
                setdataProfile({
                    name: res.data.name,
                    email: res.data.email,
                    birthday: res.data.birthday,
                    phone: res.data.phone,
                    address: res.data.address,
                    user_name: res.data.user_name,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        if (authState.userId) fetchUserData();
    }, [authState.userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActive(true);
        setdataProfile((data) => ({
            ...data,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setActive(true);
        setdataProfile((data) => ({
            ...data,
            date: date ? format(date, 'dd/MM/yyyy') : '',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateData() && active) {
            try {
                setActive(false);
                // setIsVerify(true);

                await axios.post(`http://127.0.0.1:8000/api/customers/${authState.userId}`, dataProfile);
                console.log("Profile updated successfully!");
                window.location.reload();

            } catch (error) {
                console.error("Error updating profile:", error);
            }
        } else {
            console.log("Validation failed:", formError);
        }
    };


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
        if (!dataProfile.user_name || dataProfile.user_name.length < 6 || dataProfile.user_name.length > 9) {
            error.user_name = 'Tên đăng nhập phải có từ 6 đến 9 ký tự';
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
                <input type="text" value={dataProfile.user_name} onChange={handleChange} name='username' readOnly />
            </div>
            {formError.user_name && (
                <p className='error-feedback' style={{ fontSize: '12px', marginBottom: '8px', fontFamily: 'Montserrat' }}>{formError.user_name}</p>
            )}
            <div className='proflie_list'>
                <p>Số điện thoại</p>
                <input type="text" value={dataProfile.phone} onChange={handleChange} name='phone' />
            </div>
            {formError.phone && (
                <p className='error-feedback' style={{ fontSize: '12px', marginBottom: '8px', fontFamily: 'Montserrat' }}>{formError.phone}</p>
            )}
            <div className='proflie_list'>
                <p>Email</p>
                <input type="text" value={dataProfile.email} onChange={handleChange} name='email' readOnly />
            </div>
            {formError.email && (
                <p className='error-feedback' style={{ fontSize: '12px', marginBottom: '8px', fontFamily: 'Montserrat' }}>{formError.email}</p>
            )}
            <div className='proflie_list'>
                <p>Địa chỉ</p>
                <input type="text" value={dataProfile.address} onChange={handleChange} name='address' />
            </div>
            <div className='proflie_list_date'>
                <p>Sinh nhật</p>
                <DatePicker
                    placeholder={dataProfile.birthday}
                    selected={selectedDate}
                    className='input'
                    dateFormat="dd/MM/yyyy" // Format ngày tùy chỉnh
                    onChange={handleDateChange}
                />

            </div>
            <button className={`profile_btn ${active ? 'active' : ''}`} onClick={handleSubmit}>Lưu thay đổi</button>
            {/* {isVerify && (
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
            )} */}
        </div>
    );
};

export default Profile;