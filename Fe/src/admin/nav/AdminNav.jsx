import React from 'react';
import './adminNav.css'
import Logo from '../../assets/logo_shop.png'
import { useNavigate } from 'react-router-dom';

const AdminNav = () => {

    const navigate = useNavigate();

    return (
        <div style={{display:'block',border:'1px solid #eeeaeaa6',backgroundColor:'white',padding:'8px',minHeight:'100vh',height:'100%'}}>
            <div style={{display:'flex',gap:'8px', alignItems:'center',marginBottom:'48px',cursor:'pointer'}} onClick={() => navigate('/')}>
                <img src={Logo} alt="LogoShop" style={{width:'68px',height:'68px'}}/>
                <h1 style={{fontFamily:'Montserrat', fontSize:'36px'}}>CuSan Shop</h1>
            </div>
            <div className='admin-list-option'>
                <div  onClick={() => navigate('/admin')}>
                    <p>Tổng quan</p>
                </div>
                <div  onClick={() => navigate('/admin/users')}>
                    <p>Người dùng</p>
                </div>
                <div onClick={() => navigate('/admin/portfolio')}>
                    <p>Danh mục sản phẩm</p>
                </div>
                <div>
                    <p onClick={() => navigate('/admin/products')}>Sản phẩm</p>
                </div>
                <div>
                    <p onClick={() => navigate('/admin/sales')}>Khuyến mãi</p>
                </div>
                <div>
                    <p onClick={() => navigate('/admin/orders')}>Đơn hàng</p>
                </div>
            </div>
        </div>
    );
};

export default AdminNav;