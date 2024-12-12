import React, { useContext, useState, useEffect } from 'react';
import './cart.css'
import { useSelector, useDispatch } from 'react-redux';
import cartNull from '../../../assets/cart_null.png'
import Bin from '../../../assets/bin.png'
import { addBtn, DeleteFromCart, DeleteBtn } from '../../../redux/Slice/cartSlice'
import { AuthContext } from "../../../ContextAPI/AuthContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Cart = () => {

    const CartProduct = useSelector(state => state.cart.CartArr);
    const [dataCart, setDataCart] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);

    const TotalPrice = (products) => {
        return products.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);
    };

    const formatVND = (number) => {
        const price = parseFloat(number)
        return price.toLocaleString('vi-VN');
    };

    // lay ngay hien tai
    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần +1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // const orderDetails = CartProduct.map(product => {
    //     const detail = {
    //         // order: res.data.order_id,
    //         quantity: product.quantity,
    //         total_amount: product.price * product.quantity,
    //         id_prod: product.id_prod
    //     };
    //     console.log(detail); // In ra từng đối tượng trong mảng orderDetails
    //     return detail;
    // });


    const handleClickOrder = async (e) => {
        e.preventDefault();
        try {
            // Gửi yêu cầu tạo đơn hàng
            const res = await axios.post('http://127.0.0.1:8000/api/orders/create', {
                customer_id: authState.userId,
                order_date: getCurrentDate(),
                total_amount: TotalPrice(CartProduct),
                status: 1,
            });

            if (res.status === 201) {
                console.log(res.data); // In ra toàn bộ phản hồi
                const order_id = res.data.order_id; // Lấy order_id từ phản hồi
                console.log(order_id); // In ra order_id

                // Gửi yêu cầu tạo chi tiết đơn hàng
                const orderDetails = CartProduct.map(product => ({
                    order: order_id,
                    quantity: product.quantity,
                    total_amount: product.price * product.quantity,
                    id_prod: product.id_prod
                }));

                await axios.post('http://127.0.0.1:8000/api/orders/create-detail', orderDetails);

                alert('Đơn hàng đã được tạo thành công');
            }
        } catch (error) {
            // In ra lỗi chi tiết
            console.error('Đã có lỗi xảy ra:', error.response ? error.response.data : error.message);
            alert(`Đã có lỗi xảy ra: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
        }
    };


    useEffect(() => {
        if (dataCart) {
            console.log("Updated dataCart:", dataCart);
        }
    }, [dataCart]);

    return (
        <div className='cart-container'>
            <div className='cart-h1'>
                <h1>Giỏ Hàng</h1>
            </div>
            {CartProduct.length === 0 ? (
                <div className='cart-none'>
                    <img src={cartNull} />
                </div>
            ) : (
                CartProduct.map(item => (
                    <div className='cart-list'>
                        <div className='cart-content'>
                            <img src={item.img} />
                            <div className='cart-content-list'>
                                <h2>{item.product_name}</h2>
                                <h3>Size: {item.size}</h3>
                                <p>Giá: {formatVND(item.price)} ₫</p>
                            </div>
                        </div>
                        <div className='cart-button'>
                            <div className='bin-btn' onClick={() => { dispatch(DeleteBtn({ ...item, userId: authState.userId })) }}>
                                <img src={Bin} />
                            </div>
                            <div className='quantity-btn'>
                                <button onClick={() => { dispatch(addBtn({ ...item, userId: authState.userId })) }}>+</button>
                                <p>{item.quantity}</p>
                                <button onClick={() => { dispatch(DeleteFromCart({ ...item, userId: authState.userId })) }}>-</button>
                            </div>
                        </div>
                    </div>
                ))
            )}
            <div className='order'>
                <div className='order-total'>
                    <p>Tổng Đơn:</p>
                    <p style={{ marginRight: '5px' }}>{formatVND(TotalPrice(CartProduct))} ₫</p>
                </div>
                <button className='order-btn' onClick={handleClickOrder}>Đặt hàng</button>
            </div>
        </div>
    );
};

export default Cart;