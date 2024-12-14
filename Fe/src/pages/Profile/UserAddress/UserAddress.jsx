import { useState, useEffect, useContext } from 'react';
import React from 'react';
import { AuthContext } from "../../../ContextAPI/AuthContext";
import './address.css'
import axios from 'axios';

const UserAddress = () => {

    const data_address = [
        {
            name: 'Vo quang sang',
            phone: '0974583072',
            address: 'Nghi Xuân, Hà Tĩnh',
            status: 1,
            address_id: 1,
        },
        {
            name: 'Vo quang sang',
            phone: '0974586892',
            address: 'Số 18, Ngõ 63/5/36/37 Đường Lê Đức Thọ, Phường Mỹ Đình 2, Quận Nam Từ Liêm , Hà Nội',
            status: 0,
            address_id: 2,
        }
    ]

    const [isAddressInsert, setIsAddressInsert] = useState(false);
    const { authState } = useContext(AuthContext);
    const [dataAddress, setDataAddress] = useState(data_address);

    const handleClickInsert = () => {
        setIsAddressInsert(true);
    }

    const closeInsert = () => {
        setIsAddressInsert(false);
    }

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/ship/address`);
            setDataAddress(response.data);
            console.log('hihi')
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    // const handleSetDefault = async (id) => {
    //     try {
    //         await axios.put(`http://127.0.0.1:8000/api/addresses/${id}/set-default`);

    //         fetchAddresses();
    //     } catch (error) {
    //         console.error('Error setting default address:', error);
    //     }
    // };

    const handleSetDefault = (id) => {
        setDataAddress((prevAddresses) =>
            prevAddresses.map((item) =>
                item.address_id === id
                    ? { ...item, status: 1 }
                    : { ...item, status: 0 }
            )
        );
    };

    // const handleSetUnDefault = async (id) => {
    //     try {
    //         await axios.put(`http://127.0.0.1:8000/api/addresses/${id}/set-undefault`);

    //         fetchAddresses();
    //     } catch (error) {
    //         console.error('Error setting default address:', error);
    //     }
    // };

    const handleSetUnDefault = (id) => {
        setDataAddress((prevAddresses) =>
            prevAddresses.map((item) =>
                item.address_id === id
                    ? { ...item, status: 0 }
                    : item
            )
        );
    };


    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete(`http://127.0.0.1:8000/api/addresses/${id}/delete`); 
    //         fetchAddresses();
    //     } catch (error) {
    //         console.error('Error deleting address:', error);
    //     }
    // };

    const handleDelete = (id) => {
        setDataAddress((prevAddresses) =>
            prevAddresses.filter((item) => item.address_id !== id)
        );
    };


    useEffect(() => {
        fetchAddresses();
    }, []);


    const [address, setAddress] = useState({
        name: '',
        phone: '',
        address: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (authState.isAuthenticated) {
            setDataAddress([
                ...dataAddress,
                {
                    ...address,
                    address_id: dataAddress.length + 1,
                    status: 0
                }
            ]);
            alert('Thêm địa chỉ thành công')
            setIsAddressInsert(false)
        } else {
            alert('hãy Đăng nhập để tiếp tục');
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
                                <p style={{ fontFamily: 'Montserrat', fontSize: "14px", color: 'rgba(0, 0, 0, .54)' }}>{items.address}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'end', flexDirection: 'column' }}>
                                {items.status === 1 ? (
                                    <div style={{ display: 'flex', gap: '3px' }}>
                                        <button onClick={() => handleSetUnDefault(items.address_id)} style={{ border: '1px solid #ee4d2d', fontFamily: 'Montserrat', fontSize: '12px', padding: '5px', color: '#ee4d2d' }}>Mặc định</button>
                                        <button onClick={() => handleDelete(items.address_id)} style={{ border: '1px solid rgba(0, 0, 0, .54)', fontFamily: 'Montserrat', fontSize: '12px', padding: '5px', color: 'rgba(0, 0, 0, .54)' }}>Xóa</button>
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