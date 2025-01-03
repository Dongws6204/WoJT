import React, { useEffect, useState } from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';
import './adminorder.css';
import OrderDetail from './OrderDetail';

const AdminOrder = () => {

    const fakeOrders = [
        {
            order_id: 1,
            user_name: 'Sann',
            email: 'nguyenvana@gmail.com',
            phone: '096868686',
            order_date: '2024-12-01',
            total_amount: 1500000,
            status: 1, // Đã đặt
        },
        {
            order_id: 2,
            user_name: 'CuHuu',
            email: 'tranthib@gmail.com',
            phone: '096868689',
            order_date: '2024-12-03',
            total_amount: 205000,
            status: 2, // Đang giao
        },
        {
            order_id: 3,
            user_name: 'Levii',
            email: 'levanc@gmail.com',
            phone: '096868612',
            order_date: '2024-12-05',
            total_amount: 300000,
            status: 3, // Đã giao
        },
    ];

    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState(null);
    const [orderStatus, setOrderStatus] = useState(0)
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [orderID, setOrderID] = useState(null)
    const [isOrderDetail, setIsOrderDetail] = useState(false)
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/admin/orders/`);
                if (response.status === 200) {
                    // Chuyển đổi dữ liệu theo cấu trúc yêu cầu
                    setOrders(response.data.orders);

                } else {
                    console.error("Lỗi khi truy cập:", response.status);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchData();
    }, [update]);

    useEffect(() => {
        console.log(orders)
    }, [orders]);


    useEffect(() => {
        if (Number(orderStatus) === 0) {
            setFilteredOrders(orders); // Không lọc theo trạng thái
        } else {
            setFilteredOrders(orders.filter((order) => order.status === Number(orderStatus)));
        }
    }, [orderStatus, orders]);


    const OnlickSearch = async (e) => {
        e.preventDefault();
        console.log(search);
        if (search) {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/search/orders`
                );
                //kiem tra neu response goi thanh cong
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    console.error("Lỗi khi truy cập:", response.status);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        }
    }

    const statusChange = async (orderId, newStatus) => {
        // console.log(newStatus);
        try {
            // Gọi API cập nhật status
            const response = await axios.post(`http://127.0.0.1:8000/api/admin/orders/update/${orderId}/`, {
                status: newStatus
            });

            if (response.status === 200) {
                console.log(`Cập nhật trạng thái thành công`);
                if (update) {
                    setUpdate(false);
                } else {
                    setUpdate(true);
                }

            } else {
                console.error(`Cập nhật thất bại với mã lỗi: ${response.status}`);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
        }
    };


    const formatVND = (number) => {
        const price = parseFloat(number)
        return price.toLocaleString('vi-VN');
    };

    const handleSelectChange = (e) => {
        setOrderStatus(e.target.value);
    };

    const onClickEye = (id) => {
        setOrderID(id);
        setIsOrderDetail(true);
    }

    const closeWindos = () => {
        setIsOrderDetail(false);
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

            <div className="order-list">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1>Danh sách đơn hàng</h1>
                    <div>
                        <select onChange={handleSelectChange} value={orderStatus} style={{ borderColor: '#ddd', color: '#5e5d5d' }}>
                            <option value="0">Tất cả</option>
                            <option value="1">Đã đặt</option>
                            <option value="2">Đang giao</option>
                            <option value="3">Đã giao</option>
                        </select>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên người dùng</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Ngày đặt hàng</th>
                            <th>Tổng đơn</th>
                            <th>Tình trạng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.user_name}</td>
                                <td>{order.email}</td>
                                <td>{order.phone}</td>
                                <td>{order.order_date}</td>
                                <td>{formatVND(order.total_amount)} ₫</td>
                                <td>
                                    <div>
                                        <select onChange={(e) => statusChange(order.order_id, e.target.value)} value={order.status} style={{ borderColor: '#ddd', color: '#5e5d5d' }}>
                                            <option value="1">Đã đặt</option>
                                            <option value="2">Đang giao</option>
                                            <option value="3">Đã giao</option>
                                        </select>
                                    </div>
                                </td>
                                <td><div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}><IoEyeOutline onClick={() => { onClickEye(order.order_id) }} /></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isOrderDetail && (
                    <>
                        <div
                            onClick={closeWindos}
                            style={{
                                position: "absolute",
                                zIndex: "10",
                                width: '100vw',
                                height: '368%',
                                backgroundColor: 'rgba(76, 79, 77, 0.5)',
                                display: 'flex',
                                justifyContent: 'center',
                                top: 0,
                                left: 0
                            }}>
                        </div>
                        <OrderDetail orderID={orderID} res={filteredOrders} />
                    </>
                )}
            </div>
        </>
    );
};

export default AdminOrder;
