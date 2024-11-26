import React from 'react';
import Phone from '../../assets/phone.png'
import Location from '../../assets/location.png'
import Gmail from '../../assets/email.png'
import './footer.css'
import {useNavigate} from 'react-router-dom'


const Footer = () => {

    const navigate = useNavigate();

    return (
        <footer className='footer-container'>
            <div className='footer-content'>
                <div className='footer-right'>
                    <h4 style={{marginLeft:"4px"}}>CUSAN SHOP</h4>
                    <div className='footer-right_item'>
                        <img src={Location} className='icon'/>
                        <p>E3, 144 Xuân Thủy, Cầu Giấy, Hà Nội</p>
                    </div>
                    <div className='footer-right_item'>
                        <img src={Gmail} className='icon'/>
                        <p>cusan67@gmail.com</p>
                    </div>
                    <div className='footer-right_item'>
                        <img src={Phone} className='icon'/>
                        <p>0968228386</p>
                    </div>
                </div>
                <div className='footer-mid'>
                    <h4>THƯƠNG HIỆU</h4>
                    <ul>
                        <li>Giới thiệu</li>
                        <li>Hệ thống cửa hàng</li>
                        <li>Tuyển dụng</li>
                        <li>Liên Hệ</li>
                    </ul>
                </div>
                <div className='footer-left'>
                    <h4>HỖ TRỢ</h4>
                    <ul>
                        <li>Chính sách vận chuyển</li>
                        <li onClick={()=>{navigate('/bang_size')}}>Gợi ý tìm size</li>
                        <li>Kiểm tra đơn hàng</li>
                        <li>Chính sách bảo mật thông tin KH</li>
                    </ul>
                </div>
            </div>
            <div className='footer-end'>
                <p>&copy; 2024 CUSAN SHOP</p>
            </div>
        </footer>
    );
};


export default Footer;
