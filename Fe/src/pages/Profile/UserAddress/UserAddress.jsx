import { useState, useEffect } from 'react';
import React from 'react';
import './address.css'

const UserAddress = () => {

    const [isAddressInsert, setIsAddressInsert] = useState(false);

    const handleClickInsert = () => {
        setIsAddressInsert(true);
    }

    const closeInsert = () => {
        setIsAddressInsert(false);
    }

    const data_address = [
        {
            name: 'Vo quang sang',
            phone: '0974583072',
            address: 'nghi xuan ha tinh',
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
    return (
        <div style={{ display: 'block' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0px 8px' }}>
                <p style={{ fontFamily: 'Montserrat', fontSize: "16px" }}>Địa chỉ của tôi</p>
                <button className='address-btn' onClick={handleClickInsert}>Thêm</button>
            </div>
            <hr className="lineee" style={{ width: '102%', marginLeft: '-9px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0px 8px' }}>
                {data_address.map((items) => (
                    <>
                        <div key={items.address_id} style={{ display: 'flex', justifyContent: 'space-between', }}>
                            <div style={{ display: 'block', width: '46%' }}>
                                <p style={{ fontFamily: 'Montserrat', fontSize: "14px", marginBottom: '8px' }}><span style={{ color: 'rgba(0, 0, 0, .87)' }}>{items.name}</span> | <span style={{ color: 'rgba(0, 0, 0, .54)' }}>{items.phone}</span></p>
                                <p style={{ fontFamily: 'Montserrat', fontSize: "14px", color: 'rgba(0, 0, 0, .54)' }}>{items.address}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'end', flexDirection: 'column' }}>
                                {items.status === 1 ? (
                                    <div style={{ display: 'flex', gap: '3px' }}>
                                        <button style={{ border: '1px solid #ee4d2d', fontFamily: 'Montserrat', fontSize: '12px', padding: '5px', color: '#ee4d2d' }}>Mặc định</button>
                                        <button style={{ border: '1px solid rgba(0, 0, 0, .54)', fontFamily: 'Montserrat', fontSize: '12px', padding: '5px', color: 'rgba(0, 0, 0, .54)' }}>Xóa</button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', gap: '3px' }}>
                                        <button style={{ border: '1px solid rgba(0, 0, 0, .54)', fontFamily: 'Montserrat', fontSize: '12px', padding: '5px', color: 'rgba(0, 0, 0, .54)' }}>Thiết lập mặc định</button>
                                        <button style={{ border: '1px solid rgba(0, 0, 0, .54)', fontFamily: 'Montserrat', fontSize: '12px', padding: '5px', color: 'rgba(0, 0, 0, .54)' }}>Xóa</button>
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
                            <input type="text" style={{ width: '49%', border: '1px solid black', margin: '5px 0px', minHeight: '36px', padding: '10px', fontFamily: 'Montserrat', borderColor: '#aeaeae', fontSize: '14px' }} placeholder='Họ và tên' />
                            <input type="text" style={{ width: '49%', border: '1px solid black', margin: '5px 0px', minHeight: '36px', padding: '10px', fontFamily: 'Montserrat', borderColor: '#aeaeae' }} placeholder='Số điện thoại' />
                        </div>
                        <div style={{ marginTop: '8px' }}>
                            <textarea className='addressss' placeholder='Địa chỉ cụ thể' />
                        </div>
                        <button className='addresss-btn'>Hoàn thành</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserAddress;