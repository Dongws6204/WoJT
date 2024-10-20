import React, { memo, useState, useContext } from "react";
import { FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { ContextCheckLogin } from "../../../../router";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import '../../../../style/user/header.css';
import { ROUTERS } from '../../../../utils/router.js';
import './option.css';

const Logo = () => {
    return <img className="logo" src="logo.png" alt="Logo" />;
};

const SearchBar = () => {
    return (
        <div className="search-container">
            <img className="search-icon" src="search_icon.jpg" alt="search_icon" />
            <input className="search-bar" type="text" placeholder="Search" />
        </div>
    );
};

const NavLink = () => {
    const { checkLogin, setCheckLogin, role, setRole } = useContext(ContextCheckLogin);
    const navigate = useNavigate();
    const handleLogout = () => {
        setRole('guest');
    };

    return (
        <nav className="nav">
            <Link to={ROUTERS.USER.HOME}>Trang chủ</Link>
            {role === 'guest' && (
                <>
                    <Link to={ROUTERS.GUEST.LOGIN}>Tài khoản</Link>
                </>
            )}
            {role === 'customer' && (
                <>
                    <Link to="/profile">
                        <FaUser /> Profile
                    </Link>
                    <Link to="/cart">
                        <FaShoppingCart /> Cart
                    </Link>
                    {/* <Link to="/product">Wishlist</Link>
      <Link to="/order-history">Order History</Link> */}
                    <Link to={ROUTERS.GUEST.PAGE} onClick={handleLogout}>
                        <FaSignOutAlt /> Đăng Xuất
                    </Link>
                </>
            )}
            {role === 'admin' && (
                <>
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <Link to="/admin/products">Manage Products</Link>
                    <Link to="/admin/orders">Manage Orders</Link>
                    <Link to="/admin/customers">Manage Customers</Link>
                    <Link to="/logout">Logout</Link>
                </>
            )}
        </nav>
    );
};

NavLink.propTypes = {
    userRole: PropTypes.string.isRequired,
};

const getLinkPath = (label) => {
    switch (label) {
        case 'Nam':
            return '/man';
        case 'Nữ':
            return '/woman';
        case 'Bé trai':
            return '/boy';
        case 'Bé gái':
            return '/girl';
        default:
            return '/';
    }
}



const OptionProducts = ({ label }) => {
    const linkPath = getLinkPath(label);
    return (
        <div className="option-products-container">

            <table className="custom-table">

                <thead>
                    <tr>
                        <th><Link to={`${linkPath}/newArrivals`}> Hàng mới </Link> </th>
                        <th><Link to={`${linkPath}/productCategories`} > Danh mục sản phẩm</Link></th>
                        <th></th>
                        <th><Link to={`${linkPath}/accessories`}> Phụ kiện </Link></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Link to={`${linkPath}/newArrivals`} >Hàng mới về</Link> </td>
                        <td><Link to={`${linkPath}/T-Shirts`}>Áo phông/ Áo thun </Link></td>
                        <td><Link to={`${linkPath}/homeWear`}> Quần áo mặc nhà/ đồ ngủ</Link></td>
                        <td><Link to={`${linkPath}/blankets`}> Chăn </Link></td>
                        <img src="" alt="xxx"></img>
                    </tr>

                    <tr>
                        <td></td>
                        <td><Link to={`${linkPath}/poloShirts`}> Áo polo</Link></td>
                        <td><Link to={`${linkPath}/thermalJackets`}> Áo khoác giữ nhiệt</Link></td>
                        <td><Link to={`${linkPath}/faceTowels`}>Khăn mặt</Link></td>
                    </tr>

                    <tr>
                        <th> <Link to={`${linkPath}/highlights`} >Nổi bật</Link></th>
                        <td><Link to={`${linkPath}/dressShirts`}> Áo sơ mi</Link></td>
                        <td><Link to={`${linkPath}/sweaters`}> Áo len</Link></td>
                        <td><Link to={`${linkPath}/bathTowels`}> Khăn tắm</Link></td>
                    </tr>

                    <tr>
                        <td><Link to={`${linkPath}/thanks`}>SC cảm ơn</Link></td>
                        <td><Link to={`${linkPath}/sunProtectionClothing`}>Áo chống nắng</Link></td>
                        <td><Link to={`${linkPath}/underWear`}>Đồ lót</Link></td>
                        <td><Link to={`${linkPath}/shoes`}>Giày</Link></td>
                    </tr>

                    <tr>
                        <td><Link to={`${linkPath}/bestPrice`}>Giá tốt</Link></td>
                        <td><Link to={`${linkPath}/sprotswear`}>Quần áo thể thao</Link></td>
                        <td><Link to={`${linkPath}/socks`}>Tất, vớ</Link></td>
                        <td><Link to={`${linkPath}/slippers`}>Dép</Link></td>
                    </tr>

                    <tr>
                        <td></td>
                        <td><Link to={`${linkPath}/pantAndJeans`}>Quần dài & Quần Jeans</Link></td>
                        <td><Link to={`${linkPath}/outfits`}>Bộ quần áo</Link></td>
                        <td></td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
};


const CreateListMenu = ({ label }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [currentLabel, setCurrentLabel] = useState('');
    const handleMouseEnter = () => {
        setIsOpen(true);
        setCurrentLabel(label);
    }
    const handleMouseLeave = () => {
        setIsOpen(false);
        setCurrentLabel('');
    }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="button">{label}</button>
            {isOpen && (
                <div>
                    <OptionProducts label={currentLabel} />
                </div>


            )}
        </div>
    );
};

CreateListMenu.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    })).isRequired,
};



const ListMenu = () => {
    return (
        <div className="menu-container">
            <CreateListMenu label="Sản phẩm mới" />
            <CreateListMenu label="Nữ" />
            <CreateListMenu label="Nam" />
            <CreateListMenu label="Bé gái" />
            <CreateListMenu label="Bé trai" />
        </div>
    );
};



const Header = () => {
    return (
        <div className="header-content">
            <div className="item">
                <Logo />
                <SearchBar />
                <NavLink />
            </div>
            <ListMenu />
        </div>
    );
};

export default memo(Header);
