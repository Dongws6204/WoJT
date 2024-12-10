import React, {useContext, useState, useEffect} from 'react';
import './cart.css'
import { useSelector,useDispatch } from 'react-redux';
import cartNull from '../../../assets/cart_null.png'
import Bin from '../../../assets/bin.png'
import {addBtn, DeleteFromCart,DeleteBtn} from '../../../redux/Slice/cartSlice'
import { AuthContext } from "../../../ContextAPI/AuthContext";

const Cart = () => {

    const CartProduct = useSelector(state => state.cart.CartArr);
    const [dataCart, setDataCart] = useState(null);
    const dispatch = useDispatch();
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

    const handleClickOrder = (e) => {
        e.preventDefault();
        if (authState.isAuthenticated) {
            setDataCart({
                cart : CartProduct,
                user_id : authState.userId
            });
        } else{
            alert('hãy Đăng nhập để tiếp tục mua hàng');
        }
    }

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
                            <div className='bin-btn' onClick={()=>{dispatch(DeleteBtn({...item, userId : authState.userId}))}}>
                                <img src={Bin}  />
                            </div>
                            <div className='quantity-btn'>
                                <button onClick={()=>{dispatch(addBtn({...item, userId : authState.userId}))}}>+</button>
                                <p>{item.quantity}</p>
                                <button onClick={()=>{dispatch(DeleteFromCart({...item, userId : authState.userId}))}}>-</button>
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
                <button className='order-btn' onClick={handleClickOrder}>Đặt hàng</button>
            </div>
        </div>
    );
};

export default Cart;