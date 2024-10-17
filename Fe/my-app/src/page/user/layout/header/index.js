import React, { memo, useState, useContext } from "react";
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
                    <Link to="/profile">Profile</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/wishlist">Wishlist</Link>
                    <Link to="/order-history">Order History</Link>
                    <Link to={ROUTERS.GUEST.PAGE} onClick={handleLogout}>Đăng Xuất</Link>

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


const OptionProducts = (options) => {
    return (
        <div className="option-products-container">

            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Title 1</th>
                        <th>Title 2</th>
                        <th>Title 3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Data 1</td>
                        <td>Data 2</td>
                        <td>Data 3</td>
                    </tr>
                    <tr>
                        <td>Data 4</td>
                        <td>Data 5</td>
                        <td>Data 6</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};


const CreateListMenu = ({ label, options }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="button">{label}</button>
            {isOpen && (

                // <ul className="dropdown-menu">
                //     {options.map((option, index) => (
                //         // Thay thế <li> bằng <Link> để điều hướng
                //         <li key={index}>
                //             <Link className="custom-link" to={option.link}>{option.label}</Link>
                //         </li>
                //     ))}
                // </ul>
                <OptionProducts options={options} />
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
    const options = [
        { label: 'Option 1', link: '/option1' },
        { label: 'Option 2', link: '/option2' },
        { label: 'Option 3', link: '/option3' },
        { label: 'Option A', link: '/optionA' },
        { label: 'Option B', link: '/optionB' },
        { label: 'Option C', link: '/optionC' },
        { label: 'Option X', link: '/optionX' },
        { label: 'Option Y', link: '/optionY' },
        { label: 'Option Z', link: '/optionZ' }
    ];

    const nullx = [];

    return (
        <div className="menu-container">
            <CreateListMenu label="Sản phẩm mới" />
            <CreateListMenu label="Nữ" />
            <CreateListMenu label="Nam" />
            <CreateListMenu label="Bé gái" />
            <CreateListMenu label="Bé nam" />
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
