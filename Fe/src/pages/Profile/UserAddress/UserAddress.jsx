import { useState, useEffect, useContext } from 'react';
import React from 'react';
import { AuthContext } from "../../../ContextAPI/AuthContext";
import './address.css'
import axios from 'axios';

const UserAddress = () => {

    const [isAddressInsert, setIsAddressInsert] = useState(false);
    const { authState } = useContext(AuthContext);
    const userId = authState.userId;
    const [dataAddress, setDataAddress] = useState([]);


    const handleClickInsert = () => {
        setIsAddressInsert(true);
    }

    const closeInsert = () => {
        setIsAddressInsert(false);
    }

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/ship/address/${userId}`);
            if (response.data.length === 0) {
                alert('Không có địa chỉ nào được tìm thấy!');
            }
            setDataAddress(response.data);
        } catch (error) {
            console.error('Error fetching addresses:', error);
            alert('Không thể lấy dữ liệu địa chỉ. Vui lòng thử lại sau!');
        }
    };

    const handleSetDefault = async (id) => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/ship/address/${userId}`, {
                address_id: id,
                status: 1
            });
            setDataAddress((prevAddresses) =>
                prevAddresses.map((item) =>
                    item.address_id === id
                        ? { ...item, status: 1 }
                        : { ...item, status: 0 }
                )
            );
        } catch (error) {
            console.error('Error setting default address:', error);
            alert('Không thể thiết lập mặc định. Vui lòng thử lại!');
        }
    };




    // Xóa địa chỉ
    const handleDelete = async (address_id, status) => {
        console.log("Số lượng địa chỉ hiện tại:", dataAddress.length);

        // Kiểm tra điều kiện trước khi gửi request
        if (status === 1) {
            alert('Vui lòng đổi địa chỉ mặc định để xóa!');
            return; // Dừng hàm tại đây
        }

        if (dataAddress.length === 1) {
            alert('Vui lòng thêm địa chỉ trước khi xóa địa chỉ này!');
            return; // Dừng hàm tại đây
        }

        try {
            // Gửi yêu cầu xóa địa chỉ
            const response = await axios.post(`http://127.0.0.1:8000/api/ship/address/delete`, {
                address_id: address_id,
            });

            // Kiểm tra phản hồi từ server
            if (response.status === 200) {
                setDataAddress((prevAddresses) =>
                    prevAddresses.filter((item) => item.address_id !== address_id)
                );
                alert('Xóa địa chỉ thành công');
            } else {
                alert('Không thể xóa địa chỉ. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Error deleting address:', error);
            alert('Vui lòng đổi địa chỉ mặc định để xóa!');
        }
    };




    useEffect(() => {
        fetchAddresses();
    }, []);


    const [address, setAddress] = useState({
        name: '',
        phone: '',
        address: '',

    })

    // Thêm địa chỉ
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (authState.isAuthenticated) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/ship/address/add', {
                    customer: userId,
                    name: address.name,
                    address_name: address.address,
                    phone: address.phone,
                    status: 0,

                });
                setDataAddress([...dataAddress, response.data]);
                alert('Thêm địa chỉ thành công');
                setIsAddressInsert(false);
            } catch (error) {
                console.error('Error adding address:', error);
                console.log(userId)
                console.log(address);
                alert('Thêm địa chỉ thất bại. Vui lòng thử lại!');
            }
        } else {
            alert('Hãy đăng nhập để tiếp tục');
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((data) => ({
            ...data,
            [name]: value,
        }));
    };

    return (
        <div style={{ display: 'block' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0px 8px' }}>
                <p style={{ fontFamily: 'Montserrat', fontSize: "16px" }}>Địa chỉ của tôi</p>
                <button className='address-btn' onClick={handleClickInsert}>Thêm</button>
            </div>
            <hr className="lineee" style={{ width: '102%', marginLeft: '-9px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0px 8px' }}>
                {dataAddress.map((items) => (
                    <>
                        <div key={items.address_id} style={{ display: 'flex', justifyContent: 'space-between', }}>
                            <div style={{ display: 'block', width: '46%' }}>
                                <p style={{ fontFamily: 'Montserrat', fontSize: "14px", marginBottom: '8px' }}><span style={{ color: 'rgba(0, 0, 0, .87)' }}>{items.name}</span> | <span style={{ color: 'rgba(0, 0, 0, .54)' }}>{items.phone}</span></p>
                                <p style={{ fontFamily: 'Montserrat', fontSize: "14px", color: 'rgba(0, 0, 0, .54)' }}>{items.address_name}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'end', flexDirection: 'column' }}>
                                {items.status === 1 ? (
                                    <div style={{ display: 'flex', gap: '3px' }}>
                                        {/* onClick={() => handleSetUnDefault(items.address_id)}  */}
                                        <button
                                            style={{
                                                border: '1px solid #ee4d2d', fontFamily: 'Montserrat',
                                                fontSize: '12px', padding: '5px', color: '#ee4d2d'
                                            }}>Mặc định</button>
                                        <button onClick={() => handleDelete(userId, items.address_id, items.status)} style={{ border: '1px solid rgba(0, 0, 0, .54)', fontFamily: 'Montserrat', fontSize: '12px', padding: '5px', color: 'rgba(0, 0, 0, .54)' }}>Xóa</button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', gap: '3px' }}>
                                        <button onClick={() => handleSetDefault(items.address_id)} style={{ border: '1px solid rgba(0, 0, 0, .54)', fontFamily: 'Montserrat', fontSize: '12px', padding: '5px', color: 'rgba(0, 0, 0, .54)' }}>Thiết lập mặc định</button>
                                        <button onClick={() => handleDelete(items.address_id)} style={{ border: '1px solid rgba(0, 0, 0, .54)', fontFamily: 'Montserrat', fontSize: '12px', padding: '5px', color: 'rgba(0, 0, 0, .54)' }}>Xóa</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <hr className="linee"></hr>
                    </>
                ))}
            </div>
            {isAddressInsert && (
                <>
                    <div
                        onClick={closeInsert}
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
                    <div className='address-insert'>
                        <h1 style={{ fontFamily: 'Montserrat', fontSize: '18px', marginBottom: '16px' }}>Địa chỉ mới</h1>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <input name='name' type="text" style={{ width: '49%', border: '1px solid black', margin: '5px 0px', minHeight: '36px', padding: '10px', fontFamily: 'Montserrat', borderColor: '#aeaeae', fontSize: '14px' }} placeholder='Họ và tên' onChange={handleChange} />
                            <input name='phone' type="text" style={{ width: '49%', border: '1px solid black', margin: '5px 0px', minHeight: '36px', padding: '10px', fontFamily: 'Montserrat', borderColor: '#aeaeae' }} placeholder='Số điện thoại' onChange={handleChange} />
                        </div>
                        <div style={{ marginTop: '8px' }}>
                            <textarea name='address' className='addressss' placeholder='Địa chỉ cụ thể' onChange={handleChange} />
                        </div>
                        <button className='addresss-btn' onClick={handleSubmit}>Hoàn thành</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserAddress;