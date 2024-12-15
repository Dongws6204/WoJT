import React, { useState, useEffect } from 'react';
import './userprofile.css'
import axios from 'axios';

const UserProfile = ({ userID }) => {

    const [dataProfile, setdataProfile] = useState({
        name: 'Vo Quang Sang',
        email: 'sangv6548@gmail.com',
        date: '2003-12-15',
        phone: '0974583072',
        address: 'nghi xuan ha tinh',
        username: 'Sann525'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/customers/${userID}`
                );
                //kiem tra neu response goi thanh cong
                if (response.status === 200) {
                    setdataProfile(response.data);
                } else {
                    console.error("Lỗi khi truy cập:", response.status);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        if (userID) {
            fetchData();
        }
    }, [userID]);

    return (
        <div className='proflie__container'>
            <h1>Thông tin khách hàng</h1>
            <div className='proflie_list'>
                <p>Họ và tên</p>
                <input type="text" value={dataProfile.name} name='name' readOnly />
            </div>
            <div className='proflie_list'>
                <p>Tên đăng nhập</p>
                <input type="text" value={dataProfile.username} name='username' readOnly />
            </div>
            <div className='proflie_list'>
                <p>Số điện thoại</p>
                <input type="text" value={dataProfile.phone} name='phone' readOnly />
            </div>
            <div className='proflie_list'>
                <p>Email</p>
                <input type="text" value={dataProfile.email} name='email' readOnly />
            </div>
            <div className='proflie_list'>
                <p>Địa chỉ</p>
                <input type="text" value={dataProfile.address} name='address' readOnly />
            </div>
            <div className='proflie_list'>
                <p>Sinh nhật</p>
                <input type="text" name="bithday" value={dataProfile.date} readOnly />
            </div>
            <button className='delete-btn-admin'>Xóa Người Dùng</button>
        </div>
    );
};

export default UserProfile;