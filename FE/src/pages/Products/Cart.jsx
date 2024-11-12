import React from 'react';
import './cart.css'
import { useSelector,useDispatch } from 'react-redux';
import cartNull from '../../assets/cart_null.png'
import Bin from '../../assets/bin.png'
import {addBtn, DeleteFromCart,DeleteBtn} from '../../redux/Slice/cartSlice'

const Cart = () => {

    const CartProduct = useSelector(state => state.cart.CartArr);
    const dispatch = useDispatch();
    
    const TotalPrice = (products) => {
        return products.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);
    };
    
    const formatVND = (number) => {
        return number.toLocaleString('vi-VN');
    };

    return (
        <div className='cart-container'>
            <div className='cart-h1'>
                <h1>Giỏ Hàng</h1>
            </div>
            {CartProduct.length === 0 ? (
                <div className='cart-none'>
                    <img src={cartNull}/>
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
                            <div className='bin-btn' onClick={()=>{dispatch(DeleteBtn(item))}}>
                                <img src={Bin}  />
                            </div>
                            <div className='quantity-btn'>
                                <button onClick={()=>{dispatch(addBtn(item))}}>+</button>
                                <p>{item.quantity}</p>
                                <button onClick={()=>{dispatch(DeleteFromCart(item))}}>-</button>
                            </div>
                        </div>
                    </div>
                ))
            )}
            <div className='order'>
                <div className='order-total'>
                    <p>Tổng Đơn:</p>
                    <p style={{marginRight:'5px'}}>{formatVND(TotalPrice(CartProduct))} ₫</p>
                </div>
                <button className='order-btn'>Đặt hàng</button>
            </div>
        </div>
    );
};

export default Cart;