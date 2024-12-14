import React, { useState, useEffect, useContext } from 'react';
import './userorders.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../ContextAPI/AuthContext';
import axios from 'axios';
const User_order = () => {

    const [active, setActive] = useState(1);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const { authState } = useContext(AuthContext);
    const userId = authState?.userId
    const [orderInfo, setOrderInfo] = useState([]);


    const getOrderInfo = async () => {
        try {
            // Lấy danh sách order_id từ API 1
            const response = await axios.get(`http://127.0.0.1:8000/api/orders/get/${userId}`, {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                },
            });
            const orders = response.data; // Mảng các đơn hàng [{ order_id, total_amount, order_date }]
            if (!orders || orders.length === 0) {
                console.log('No orders found');
                return;
            }

            const orderIds = orders.map(order => order.order_id);

            // Lấy chi tiết các order từ API 2
            const res2 = await axios.post('http://127.0.0.1:8000/api/orders/get-detail', {
                order_id: orderIds,
            });
            const orderDetails = res2.data; // Mảng [{ order, quantity, total_amount, id_prod }]
            if (!orderDetails || orderDetails.length === 0) {
                console.log('No order details found');
                return;
            }

            const productIds = orderDetails.map(detail => detail.id_prod);

            // Lấy thông tin sản phẩm từ API 3
            const res3 = await axios.post('http://127.0.0.1:8000/api/orders/get-productdetail', {
                id_prod: productIds,
            });
            const products = res3.data; // Mảng sản phẩm [{ product_id, product_name, img, price, size }]
            if (!products || products.length === 0) {
                console.log('No products found');
                return;
            }

            // Xử lý ghép dữ liệu
            const mergedOrderInfo = orders.map(order => {
                const details = orderDetails
                    .filter(detail => detail.order === order.order_id)
                    .map(detail => {
                        const product = products.find(prod => prod.id_prod === detail.id_prod);
                        return {
                            product_id: product.product_id,
                            img: product ? product.img : null,
                            product_name: product ? product.product_name : 'Unknown',
                            quantity: detail.quantity,
                            size: detail.size,
                            price: detail.total_amount, // Giá từ bảng orderDetail
                        };
                    });

                return {
                    order_id: order.order_id,
                    orderdetail: details,
                    total_amount: order.total_amount,
                    order_date: order.order_date,
                };
            });


            // Cập nhật state
            setOrderInfo(mergedOrderInfo);
            console.log('Merged Order Info:', mergedOrderInfo);
            console.log('OrderInfo:', orderInfo);
        } catch (error) {
            console.error('Error fetching order info:', error);
            alert('Failed to fetch order information. Please try again.');
        }
    };

    useEffect(() => {
        getOrderInfo();

    }, []);
    useEffect(() => {
        console.log('Updated OrderInfo:', orderInfo);
    }, [orderInfo]);

    const dang_van_chuyen = [
        {
            order_id: 1,
            orderdetail: [
                {
                    product_id: 1,
                    img: 'https://canifa.com/img/500/750/resize/8/t/8ts25a002-se409-xl-1-u.webp',
                    product_name: 'Áo phông nam',
                    quantity: 2,
                    size: 'L',
                    price: '14900000.00',
                },
                {
                    product_id: 1,
                    img: 'https://canifa.com/img/500/750/resize/8/t/8ts25a002-se409-xl-1-u.webp',
                    product_name: 'Áo phông nam',
                    quantity: 1,
                    size: 'XL',
                    price: '149000.00', // của bảng orderdetail không phải product_detail
                }
            ],
            total_amount: '1000000.00',
            order_date: '15/12/2025'
        }
    ];


    useEffect(() => {
        if (active === 1) {
            setData(orderInfo);
            console.log(data)
        } else if (active === 2) {
            setData(dang_van_chuyen);
        } else {
            setData([]);
        }
    }, [active, orderInfo]);

    const handleClick = (name, id) => {
        // localStorage.setItem('product_id', id);
        navigate(`/product/${encodeURIComponent(name)}`, {
            state: { id }
        })
        scrollToTop();
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Cuộn mượt mà
        });
    }


    const optionClick = (number) => {
        setActive(number)
    }

    const formatVND = (number) => {
        const price = parseFloat(number)
        return price.toLocaleString('vi-VN');
    };


    const deleteOrder = async (orderId) => {
        try {
            console.log(`Deleting order with ID: ${orderId}`);
            // Gọi API để hủy đơn hàng
            await axios.post(`http://127.0.0.1:8000/api/orders/delete/${orderId}`, {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                },
                data: {
                    'order_id': orderId,
                }
            });

            // Cập nhật danh sách đơn hàng sau khi xóa
            setOrderInfo(prevOrders => prevOrders.filter(order => order.order_id !== orderId));
            alert('Order has been successfully deleted.');
        } catch (error) {
            console.error('Error deleting order:', error);
            alert('Failed to delete the order. Please try again.');
        }
    };



    return (
        <div className='orders-container'>
            <div className='orders-header'>
                <p className={`orders-header-option ${active === 1 ? "active" : ""}`} onClick={() => optionClick(1)}>Đã đặt</p>
                <p className={`orders-header-option ${active === 2 ? "active" : ""}`} onClick={() => optionClick(2)}>Đang vận chuyển</p>
                <p className={`orders-header-option ${active === 3 ? "active" : ""}`} onClick={() => optionClick(3)}>Đã nhận</p>
            </div>
            {data.map(items => (
                <div key={items.order_id} className='orders-content'>
                    <div style={{ backgroundColor: '#e0e0e07a', height: '26px', display: 'flex', alignItems: 'center' }}>
                        <h1 style={{ marginLeft: '8px', fontFamily: 'Montserrat' }}>{items.order_date}</h1>
                    </div>
                    {items.orderdetail.map((item, index) => (
                        <div className='orders-content_card' key={index}>
                            <div className='card__right'>
                                <img
                                    src={item.img}
                                    alt={item.product_name}
                                    onClick={() => handleClick(item.product_name, item.product_id)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <div className='card__right-content'>
                                    <p>{item.product_name}</p>
                                    <p>Size: {item.size} x<span>{item.quantity}</span></p>
                                </div>
                            </div>
                            <div className='card__left'>
                                <p style={{ marginTop: '68px' }}>
                                    <span style={{ color: '#4b4b4b', fontWeight: '100' }}>
                                        {formatVND(item.product.price)} ₫
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}

                    <hr className="linee" />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', width: '100%', height: '26px' }}>
                        {active === 1 ? (
                            <button className='huydon-btn'
                                onClick={() => deleteOrder(items.order_id)}
                                style={{ marginLeft: '8px', fontFamily: 'Montserrat', color: 'white' }}>Hủy đơn</button>
                        ) : (
                            <div></div>
                        )}
                        <p style={{ fontFamily: 'Montserrat', marginRight: '8px' }}>Tổng tiền : {formatVND(items.total_amount)} ₫</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default User_order;