import { memo } from "react";
import { Link } from "react-router-dom";
import '../../../../style/user/header.css';
import { ROUTERS } from '../../../../utils/router.js';

const Logo = () => {
    return <img className="logo"
        src="logo.png"
        alt="Logo"
    />;
};

const SearchBar = () => {
    return (
        <div className="search-container">
            <img className="search-icon"
                src="search_icon.jpg"
                alt="search_icon"
            />
            <input
                className="search-bar"
                type="text"
                placeholder="Search"
            />
        </div>
    );
};

const NavLink = ({ userRole }) => {
    return (
        <nav className="nav">
            <Link to={ROUTERS.USER.HOME}>Trang chủ</Link>
            <Link to={ROUTERS.USER.PROFILE}>Sản phẩm</Link>
            <Link to={ROUTERS.GUEST.LOGIN}>Tài khoản</Link>

            {/* Nếu là khách */}
            {userRole === 'guest' && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}

            {/* Nếu là khách hàng đã đăng nhập */}
            {userRole === 'customer' && (
                <>
                    <Link to="/profile">Profile</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/wishlist">Wishlist</Link>
                    <Link to="/order-history">Order History</Link>
                    <Link to="/logout">Logout</Link>
                </>
            )}

            {/* Nếu là quản trị viên */}
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

const Header = () => {
    return (
        <div className="header-content">
            <div className="item">
                <Logo className="logo" />
                <SearchBar className="search-bar" />
                <NavLink />
            </div>
        </div>
    );
};


export default memo(Header);
