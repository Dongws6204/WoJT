import React, { useState, useEffect } from 'react';
import './adminusers.css'
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoEyeOutline } from "react-icons/io5";
import Avatar from '../../assets/user.png'
import axios from 'axios'
import UserProfile from './UserProfile';


const AdminUsers = () => {

    const [users, setUsers] = useState([
    ]);
    const navigate = useNavigate();
    const [userID, setUserID] = useState(null);
    const [userProfile, setUserProfile] = useState(false);
    const [search, setSearch] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/admin/customer');
                setUsers(res.data);
            }
            catch (error) {
                console.error('Lỗi', error);
                alert('Không thể lấy dữ liệu. Vui lòng thử lại sau!');
            }
        };
        fetchData();
    }, []);

    const onClickEye = (id) => {
        setUserID(id);
        setUserProfile(true);
    }

    const closeWindos = () => {
        setUserProfile(false);
    }

    const OnlickSearch = async (e, customerId) => {
        e.preventDefault();
        console.log(search);
        if (search) {
            try {
                const response = await axios.post(
                    `http://127.0.0.1:8000/api/customers/${customerId}`
                );
                //kiem tra neu response goi thanh cong
                if (response.status === 200) {
                    setUsers(response.data);
                } else {
                    console.error("Lỗi khi truy cập:", response.status);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className='admin-search'>
                    <input type="text" placeholder='search...' style={{ border: 'none', width: '92%' }} onChange={(e) => { setSearch(e.target.value) }} />
                    <IoSearchOutline style={{ width: '22px', height: '22px', color: '#757575', cursor: 'pointer' }} onClick={OnlickSearch} />
                </div>
            </div>
            <hr className="linE" />
            <div className='user-table'>
                <h2>Danh sách người dùng</h2>
                <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Quyền</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.user_id}>
                                    <td>{user.customer_id}</td>
                                    <td><div style={{ display: 'flex', justifyContent: 'center' }}><img src={Avatar} style={{ width: '28px', height: '28px' }} /></div></td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.role === 1 ? "User" : "Admin"}</td>
                                    <td><div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}><IoEyeOutline onClick={() => { onClickEye(user.customer_id) }} /></div></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" style={{ textAlign: "center" }}>
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {userProfile && (
                    <>
                        <div
                            onClick={closeWindos}
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
                        <UserProfile userID={userID} />
                    </>
                )}
            </div>

        </>
    );
};

export default AdminUsers;