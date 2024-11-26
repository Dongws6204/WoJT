import React, {useContext} from 'react';
import './navbar.css'
import User_img from '../../assets/user.png'
import { BsBag, BsPersonVcard } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import { FiUnlock } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { RiHome2Line } from "react-icons/ri";
import { AuthContext } from "../../ContextAPI/AuthContext";

const NavbarUser = () => {

    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/') 
    };

    const Customers = {
        customer_id: 1,
        name: 'Vo Quang Sang',
        email: 'sangv6548@gmail.com',
        phone: '0974583072',
        address: 'nghi xuan , ha tinh',
        birthday: '2004-12-15',
        user_name: 'Sann525'
    }

    return (
        <div className='nav-container'>
            <div className='nav-header'>
                <img src={User_img} />
                <p>{Customers.name}</p>
            </div>
            <div className='nav-content'>
                <div className='nav-list'>
                    <div className='list_img'>
                        <BsPersonVcard className='icon_svg' />
                    </div>
                    <p style={{ marginLeft: '8px', marginTop: '1px' }} onClick={() => { navigate('/profile/thong_tin_tai_khoan') }}>Thông tin tài khoản</p>
                </div>
                <div className='nav-list'>
                    <div className='list_img'>
                        <BsBag className='icon_svg' />
                    </div>
                    <p style={{ marginLeft: '9px', marginTop: '4px' }} onClick={() => { navigate('/profile/don_hang') }}>Đơn hàng</p>
                </div>
                <div className='nav-list'>
                    <div className='list_img'>
                        <FiUnlock className='icon_svg' />
                    </div>
                    <p style={{ marginLeft: '9px', marginTop: '4px' }} onClick={() => { navigate('/profile/doi_mat_khau') }}>Đổi mật khẩu</p>
                </div>
                <div className='nav-list'>
                    <div className='list_img'>
                    <RiHome2Line className='icon_svg'/>
                    </div>
                    <p style={{ marginLeft: '9px' }} onClick={() => { navigate('/profile/dia_chi_giao_hang') }}>Địa chỉ</p>
                </div>
                <div className='nav-list'>
                    <div className='list_img'>
                        <IoExitOutline className='icon_svg_1' />
                    </div>
                    <p style={{ marginLeft: '9px' }} onClick={handleLogout}>Đăng xuất</p>
                </div>
            </div>
        </div>
    );
};

export default NavbarUser;