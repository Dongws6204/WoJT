import React from "react";
import axios from "axios";
import logoShop from "../../assets/logo_shop.png";
import { PiMagnifyingGlass } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";
import { IoCartOutline } from "react-icons/io5";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../../ContextAPI/AuthContext";
import "./Header.css";

const Header = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [portfolios, setPortfolios] = useState([]);
    const [objects, setObjects] = useState([]);
    const [search, setSearch] = useState(null);
    const CartProduct = useSelector((state) => state.cart.CartArr);
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    const [username, setUsername] = useState('')

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/customers/${authState.userId}`);
                setUsername(res.data.user_name);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        if (authState.userId) fetchUserData();
    }, [username]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/products/list-object`
                );
                //kiem tra neu response goi thanh cong
                if (response.status === 200) {
                    setObjects(response.data.products);
                } else {
                    console.error("Lỗi khi truy cập:", response.status);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchData();
    }, []);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Cuộn mượt mà
        });
    }

    function createSlug(name) {
        return name
            .toLowerCase()
            .trim() // Xóa khoảng trắng ở đầu và cuối
            .replace(/\s+/g, '_') // Thay thế khoảng trắng bằng dấu gạch ngang
            .replace(/-+/g, '_'); // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
    }

    const handleClickSearch = () => {
        navigate(`/search/${search}`, {
            state: { search }
        });
        scrollToTop();
    }

    const handleClickCart = () => {
        navigate("/cart")
        scrollToTop();
    }

    const handleClick = () => {
        if (authState.isAuthenticated) {
            navigate("/profile/thong_tin_tai_khoan");
            scrollToTop();
        } else {
            setShowOptions((prev) => !prev);
        }
    };

    const onClickObject = (objectId, objectName) => {
        setActiveId(objectId);
        localStorage.setItem('object_name', objectName);
        if (objectId === 0) {
            // setPortfolios([]);
            navigate("/");
        } else {
            const selectedObject = objects.find((obj) => obj.object_id === objectId);

            if (selectedObject) {
                // Nếu tìm thấy, đặt portfolio
                setPortfolios(selectedObject.portfolio);
            } else {
                console.error("Không tìm thấy đối tượng với object_id:", objectId);
            }
        }
    };

    const onClickPortfolio = (portId, portName) => {
        localStorage.setItem('port_name', portName);
        setPortfolios([]);
        setActiveId(null);
        navigate(`/products/${createSlug(localStorage.getItem('object_name'))}/${createSlug(portName)}`, {
            state: { portId }
        });
        scrollToTop();
    }

    const LeaveListPortfolio = () => {
        setActiveId(null);
        setPortfolios([]);
    };

    return (
        <>
            <div className="header">
                <div className="object_list">
                    <img className="logo-shop" src={logoShop} alt="Logo Shop" />
                    <div key={0} className="ob_list" onClick={() => onClickObject(0)}>
                        <p>TRANG CHỦ</p>
                    </div>
                    {objects.map((item) => (
                        <div
                            key={item.object_id}
                            className={`ob_list ${activeId === item.object_id ? "active" : ""}`}
                            onMouseEnter={() => onClickObject(item.object_id, item.object_name)}
                        >
                            <p>{item.object_name}</p>
                        </div>
                    ))}
                </div>

                <div className="function_list">
                    <div className="search">
                        <input type="text" className="search-input" placeholder="Search..." onChange={(e) => { setSearch(e.target.value) }} />
                        <button>
                            <PiMagnifyingGlass className="look" onClick={handleClickSearch} />
                        </button>
                    </div>
                    <div className="account item" onClick={handleClick}>
                        <VscAccount className="icon ic1" />
                        <span
                            style={{
                                fontFamily: "Montserrat",
                                fontSize: "14px",
                                color: "#323232",
                            }}
                        >
                            {authState.isAuthenticated ? username : "Tài Khoản"}
                        </span>
                        {!authState.isAuthenticated && showOptions && (
                            <div className="account-options">
                                <ul>
                                    <li
                                        style={{
                                            fontFamily: "Montserrat",
                                            fontSize: "12px",
                                            color: "rgb(28 28 28)",
                                        }}
                                        onClick={() => navigate("/login")}
                                    >
                                        Đăng Nhập
                                    </li>
                                    <li
                                        style={{
                                            fontFamily: "Montserrat",
                                            fontSize: "12px",
                                            color: "rgb(28 28 28)",
                                        }}
                                        onClick={() => navigate("/register")}
                                    >
                                        Đăng Ký
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="cart item">
                        <IoCartOutline
                            className="icon ic2"
                            onClick={handleClickCart}
                        />
                        <span
                            style={{
                                fontFamily: "Montserrat",
                                fontSize: "14px",
                                color: "#323232",
                            }}
                        >
                            Giỏ Hàng
                        </span>
                        <span className="badge">{CartProduct.length}</span>
                    </div>
                </div>
            </div>
            {portfolios.length > 0 && (
                <div onMouseLeave={LeaveListPortfolio} className="portfolio_list">
                    {portfolios.map((portfolio) => (
                        <div key={portfolio.id_port} className="portfolio_item" >
                            <p onClick={() => onClickPortfolio(portfolio.id_port, portfolio.port_name)}>{portfolio.port_name}</p>
                        </div>
                    ))}
                </div>)}
        </>
    );
};

export default Header;
