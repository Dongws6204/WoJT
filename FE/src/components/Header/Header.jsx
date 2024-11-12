import React from 'react';
import logoShop from '../../assets/logo_shop.png'
import { PiMagnifyingGlass } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";
import { IoCartOutline } from "react-icons/io5";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';


const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(true); // Kiểm tra xem người dùng đã đăng nhập chưa
    const [showOptions, setShowOptions] = useState(false); // Chuyển đổi tùy chọn hiển thị
    const navigate = useNavigate(); // Để điều hướng đến trang hồ sơ hoặc các trang khác

    const Customers = {
        customer_id: 1,
        name: 'Vo Quang Sang',
        email: 'sangv6548@gmail.com',
        phone: '0974583072',
        address: 'nghi xuan , ha tinh',
        birthday: '2004-12-15',
        user_name: 'Sann525'
    }

    localStorage.setItem('customer_id', Customers.customer_id);
    // setIsLoggedIn(true);
    // if (isLoggedIn === true) {
    //     localStorage.setItem('customer_id', Customers.customer_id);
    // }

    const handleClick = () => {
        if (isLoggedIn) {
            navigate('/profile/thong_tin_tai_khoan'); // Chuyển hướng đến hồ sơ người dùng nếu đã đăng nhập
        } else {
            setShowOptions(prev => !prev); // Chuyển đổi khả năng hiển thị hộp tùy chọn
        }
    };

    const [activeId, setActiveId] = useState(null); // Theo dõi ID đối tượng đang hoạt động
    const [portfolios, setPortfolios] = useState([]); // 
    const CartProduct = useSelector(state => state.cart.CartArr)// số lượng sản phẩm trong giỏ hàng 


    const onClickObject = async (objectId) => {
        setActiveId(objectId); // Đặt đối tượng được click vào là đang hoạt động
        if (objectId === 0) {
            navigate('/'); // Navigate to the home page when "TRANG CHỦ" is clicked
        } else {
            // Lấy danh mục đầu tư dựa trên đối tượng được click
            try {
                const response = await axios.get(`/api/portfolio?object_id=${objectId}`);
                setPortfolios(response.data);
            } catch (error) {
                console.error('Error fetching portfolios:', error);
            }
        }
    };

    return (
        <div className='header'>
            <div className='object_list'>
                <img className='logo-shop' src={logoShop} alt="Logo Shop" />
                <div key={0} className='ob_list' onClick={() => onClickObject(0)}>
                    <p>TRANG CHỦ</p>
                </div>
                {[1, 2, 3, 4].map(id => (
                    <div
                        key={id}
                        className={`ob_list ${activeId === id ? 'active' : ''}`}
                        onClick={() => onClickObject(id)}>
                        <p>{['', 'BÉ TRAI', 'BÉ GÁI', 'NAM', 'NỮ'][id]}</p>
                    </div>
                ))}
            </div>

            {/* Render the portfolios
            <div className="portfolio_list">
                {portfolios.length > 0 && (
                    portfolios.map((portfolio) => (
                        <div id={portfolio.id_port} className="portfolio_item">
                            <p>{portfolio.port_name}</p>
                        </div>
                    ))
                )};
            </div> */}

            <div className='function_list'>
                <div className='search'>
                    <input type="text" className='search-input' placeholder='Search...' />
                    <button>
                        <PiMagnifyingGlass className='look' />
                    </button>
                </div>
                <div className='account item' onClick={handleClick}>
                    <VscAccount className='icon ic1'/>
                    <span style={{fontFamily:"Montserrat" , fontSize:'14px' , color:'#323232'}}>{isLoggedIn ? Customers.user_name : 'Tài Khoản'}</span>
                    {!isLoggedIn && showOptions && (
                        <div className="account-options">
                            <ul>
                                <li style={{fontFamily:"Montserrat" , fontSize:'12px' , color:'rgb(28 28 28)'}} onClick={() => navigate('/login')}>Đăng Nhập</li>
                                <li style={{fontFamily:"Montserrat" , fontSize:'12px' , color:'rgb(28 28 28)'}} onClick={() => navigate('/register')}>Đăng Ký</li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className='cart item'>
                    <IoCartOutline className='icon ic2' onClick={() => navigate('/cart')}/>
                    <span style={{fontFamily:"Montserrat" , fontSize:'14px' , color:'#323232'}}>Giỏ Hàng</span>
                    <span className="badge">{CartProduct.length}</span>
                </div>
            </div>

        </div>
    );
};

export default Header;