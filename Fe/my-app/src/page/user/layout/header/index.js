import React, { memo, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
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

const NavLink = ({ userRole }) => {
    return (
        <nav className="nav">
            <Link to={ROUTERS.USER.HOME}>Trang chủ</Link>
            <Link to={ROUTERS.GUEST.LOGIN}>Tài khoản</Link>
            {userRole === 'guest' && (
                <>
                    <Link to="/login">Login</Link>
                </>
            )}
            {userRole === 'customer' && (
                <>
                    <Link to="/profile">Profile</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/wishlist">Wishlist</Link>
                    <Link to="/order-history">Order History</Link>
                    <Link to="/logout">Logout</Link>
                </>
            )}
            {userRole === 'admin' && (
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

const CreateListMenu = ({ label, options }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    return (
        <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="dropdown-button">{label}</button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map((option, index) => (
                        // Thay thế <li> bằng <Link> để điều hướng
                        <li key={index}>
                            <Link className="custom-link" to={option.link}>{option.label}</Link>
                        </li>
                    ))}
                </ul>
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

    return (
        <div className="menu-container">
            <CreateListMenu label="Menu 1" options={options} />
            <CreateListMenu label="Menu 2" options={options} />
            <CreateListMenu label="Menu 3" options={options} />
            <CreateListMenu label="Menu 3" options={options} />
            <CreateListMenu label="Menu 3" options={options} />
        </div>
    );
};



const Header = () => {
    return (
        <div className="header-content">
            <div className="item">
                <Logo />
                <SearchBar />
                <NavLink userRole="guest" />
            </div>
            <ListMenu />
        </div>
    );
};

export default memo(Header);
