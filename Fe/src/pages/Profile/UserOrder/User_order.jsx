import React, { useState,useEffect } from 'react';
import './userorders.css'
import { useNavigate } from 'react-router-dom';

const User_order = () => {

    const [active , setActive] = useState(1);
    const navigate = useNavigate();
    const [data,setData] = useState([]);

    const da_dat = [
        {       
            order_id:1,
            orderdetail : [
                {
                    product_id:1,
                    img: 'https://canifa.com/img/500/750/resize/8/t/8ts25a002-se409-xl-1-u.webp',
                    product_name:'Áo phông nam',
                    quantity :2,
                    size: 'L',
                    price: '149000.00',
                },
                {
                    product_id:1,
                    img: 'https://canifa.com/img/500/750/resize/8/t/8ts25a002-se409-xl-1-u.webp',
                    product_name:'Áo phông nam',
                    quantity :1,
                    size: 'XL',
                    price: '149000.00',
                }
            ],
            total_amount : '1000000.00',
            order_date :'15/12/2025'
        },
        {   
            order_id:2,
            orderdetail : [
                {
                    product_id:2,
                    img: 'https://canifa.com/img/500/750/resize/8/t/8tl24w002-sk010-thumb.webp',
                    product_name:'Áo phông nam',
                    quantity :1,
                    size: 'L',
                    price: '149000.00',
                }
            ],
            total_amount : '1000000.00',
            order_date :'15/12/2025'
        }
    ];


    const dang_van_chuyen = [
        {       
            order_id:1,
            orderdetail : [
                {
                    product_id:1,
                    img: 'https://canifa.com/img/500/750/resize/8/t/8ts25a002-se409-xl-1-u.webp',
                    product_name:'Áo phông nam',
                    quantity :2,
                    size: 'L',
                    price: '14900000.00',
                },
                {
                    product_id:1,
                    img: 'https://canifa.com/img/500/750/resize/8/t/8ts25a002-se409-xl-1-u.webp',
                    product_name:'Áo phông nam',
                    quantity :1,
                    size: 'XL',
                    price: '149000.00', // của bảng orderdetail không phải product_detail
                }
            ],
            total_amount : '1000000.00',
            order_date :'15/12/2025'
        }
    ];


    useEffect(() => {
        if (active === 1) {
            setData(da_dat);
        } else if(active===2) {
            setData(dang_van_chuyen);
        } else {
            setData([]);
        }
    }, [active]);

    const handleClick = (name,id) => {
        // localStorage.setItem('product_id', id);
        navigate(`/product/${encodeURIComponent(name)}`,{
            state:{id}
        })
        scrollToTop();
    }


    const optionClick = (number) => {
        setActive(number)
    }

    const formatVND = (number) => {
        const price = parseFloat(number)
        return price.toLocaleString('vi-VN');
    };

    return (
        <div className='orders-container'>
            <div className='orders-header'>
                <p className={`orders-header-option ${active === 1 ? "active" : ""}`} onClick={()=>optionClick(1)}>Đã đặt</p>
                <p className={`orders-header-option ${active === 2 ? "active" : ""}`} onClick={()=>optionClick(2)}>Đang vận chuyển</p>
                <p className={`orders-header-option ${active === 3 ? "active" : ""}`} onClick={()=>optionClick(3)}>Đã nhận</p>
            </div>
            {data.map(items=>(
                <div key={items.order_id} className='orders-content'>
                    <div style={{backgroundColor:'#e0e0e07a',height:'26px',display:'flex',alignItems:'center'}}>
                        <h1 style={{marginLeft:'8px',fontFamily:'Montserrat'}}>{items.order_date}</h1>
                    </div>
                    {items.orderdetail.map(item=>(
                        <div className='orders-content_card'>
                            <div className='card__right'>
                                <img src={item.img} onClick={()=>{handleClick(item.product_name,item.product_id)}} style={{cursor:'pointer'}}/>
                                <div className='card__right-content'>
                                    <p>{item.product_name}</p>
                                    <p>Size: {item.size} x<span>{item.quantity}</span></p>
                                </div>
                            </div>
                            <div className='card__left'>
                                <p style={{marginTop:'68px'}}><span style={{ color:'#4b4b4b',fontWeight:'100'}}>{formatVND(item.price*item.quantity)} ₫</span></p>
                            </div>
                        </div>
                    ))}
                    <hr className="linee" />
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px',width:'100%',height:'26px'}}>
                        {active === 1 ? (
                            <button className='huydon-btn' style={{marginLeft:'8px',fontFamily:'Montserrat',color:'white'}}>Hủy đơn</button>
                        ) : ( 
                            <div></div>
                        )}
                        <p style={{fontFamily:'Montserrat', marginRight:'8px'}}>Tổng tiền : {formatVND(items.total_amount)} ₫</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default User_order;