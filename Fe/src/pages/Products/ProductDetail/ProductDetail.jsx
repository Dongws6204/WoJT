import React, { useState, useEffect, useContext } from 'react';
import './productdetail.css'
import Star from '../../../assets/star.png'
import Box from '../../../assets/box.png'
import Delivery from '../../../assets/delivery-van.png'
import Delivery_man from '../../../assets/delivery-man.png'
import User_item from '../../../assets/user_1.png'
import Send from '../../../assets/send.png'
import { useDispatch } from 'react-redux';
import Ruller from '../../../assets/ruller.png'
import { addToCart, addSize } from '../../../redux/Slice/cartSlice'
import axios from 'axios';
import { AuthContext } from "../../../ContextAPI/AuthContext";
import ProductViewed from '../ProductViewed/ProductViewed';
import ProductSuggestion from '../ProductSuggestion/ProductSuggestion';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";

const ProductDetail = () => {

    const [selectedSize, setSelectedSize] = useState(null); //id_prod
    const [size, setSize] = useState('');//size_name
    const [mota, setMota] = useState(false);
    const [hdsd, setHdsd] = useState(false);
    const [isSpan1, setIsSpan1] = useState(false);
    const [isSpan2, setIsSpan2] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [hoveredStars, setHoveredStars] = useState(0);
    const [selectedStars, setSelectedStars] = useState(0); // Trạng thái lưu số ngôi sao đã chọn 
    const location = useLocation();
    const product_Id = location.state?.id;
    const navigate = useNavigate();
    const [dataRate, setDataRate] = useState({
        comments: '',
        star: ''
    });
    const [dataProduct, setDataProduct] = useState({});
    const [data_rate, setData_rate] = useState([]);
    const [listRate, setListRate] = useState([]);
    const [loadedCount, setLoadedCount] = useState(5);
    const [dataProductDetail, setDataProductDetail] = useState([]);
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Cuộn mượt mà
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/products/${product_Id}`
                );
                //kiem tra neu response goi thanh cong
                if (response.status === 200) {
                    setDataProduct(response.data.product);
                    setDataProductDetail(response.data.product.product_detail);
                } else {
                    console.error("Lỗi khi truy cập:", response.status);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        if (product_Id) {
            fetchData();
        }
    }, [product_Id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/reviews/product/${product_Id}`
                );
                //kiem tra neu response goi thanh cong
                if (response.status === 200) {
                    setData_rate(response.data);
                } else {
                    console.error("Lỗi khi truy cập:", response.status);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        if (product_Id) {
            fetchData();
        }
    }, [product_Id]);

    useEffect(() => {
        setListRate(data_rate.slice(0, 5));
    }, [data_rate]);

    const loadMore = () => {
        const nextCount = loadedCount + 5;
        setListRate(data_rate.slice(0, nextCount));
        setLoadedCount(nextCount);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (authState.isAuthenticated) {
            if ((!dataRate.comments.trim() && !dataRate.star) || (dataRate.comments.trim() && !dataRate.star)) {
                alert('Đánh giá không hợp lệ: Vui lòng thêm sao hoặc bình luận!');
            } else if ((dataRate.star && !dataRate.comments.trim()) || (dataRate.star && dataRate.comments.trim())) {
                alert('Đánh giá thành công')
                console.log("formdata", dataRate);
            }
        } else {
            alert('Vui lòng đăng nhập')
        }
    }

    const dispatch = useDispatch();

    const handleMouseEnter = (star) => {
        setHoveredStars(star); // Cập nhật số ngôi sao đang hover
    };

    const handleMouseLeave = () => {
        setHoveredStars(0); // Đặt về 0 khi di chuột ra ngoài
    };

    const handleClick = (star) => {
        setSelectedStars(star); // Lưu số ngôi sao được chọn
        setDataRate((data) => ({
            ...data,
            star: star
        }));
    };

    const CommentChange = (e) => {
        setDataRate((data) => ({
            ...data,
            comments: e.target.value
        }));
    };

    const clickPopup = async () => {
        console.log(dataRate, authState.userId, product_Id);

        // Lấy ngày hôm nay theo định dạng yyyy-mm-dd
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0]; // yyyy-mm-dd

        // Chuẩn bị dữ liệu gửi đi
        const payload = {
            customer: authState.userId, // ID của user
            product: product_Id,        // ID của sản phẩm
            comments: dataRate.comments, // Nội dung bình luận
            star: dataRate.star,        // Số sao
            date_posted: formattedDate, // Ngày hiện tại
        };

        console.log("Payload gửi đi:", payload);
        if (payload.comments === undefined) { alert('Vui lonfg theem binfh luaanj') } else {
            try {
                // Gửi POST request đến API
                const response = await fetch('http://127.0.0.1:8000/api/reviews/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Bình luận đã được gửi thành công!');
                    // Đóng popup
                    setIsPopupVisible(false);
                    console.log("Kết quả từ server:", result);
                } else {
                    setIsPopupVisible(false);
                    alert('Vui lòng mua sản phẩm để được bình luận:>');
                    console.error("Lỗi từ server:", result);
                    // Đóng popup

                }
            } catch (error) {
                console.error("Lỗi khi gửi yêu cầu:", error);
                alert('Đã xảy ra lỗi khi gửi bình luận.');
            }

            // Đóng popup
            // setIsPopupVisible(!isPopupVisible);
        }

    };

    const formatVND = (number) => {
        const price = parseFloat(number)
        return price.toLocaleString('vi-VN');
    };

    const clickMota = () => {
        setMota(!mota)
    }

    const clickSpan1 = () => {
        setIsSpan1(!isSpan1);
    };

    const clickSpan2 = () => {
        setIsSpan2(!isSpan2);
    };

    const clickHdsd = () => {
        setHdsd(!hdsd)
    }

    const handleSizeSelect = (size, size_name) => {
        setSelectedSize(size)
        setSize(size_name)
        //
    };

    const clickBangSize = () => {
        navigate('/bang_size')
    }

    // zoom ảnh
    useEffect(() => {
        const imageZoom = document.querySelector('.list-img');
        const zoomImage = document.getElementById('zoomImage');

        if (imageZoom && zoomImage) { // Kiểm tra phần tử tồn tại trước khi thêm sự kiện
            imageZoom.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = imageZoom.getBoundingClientRect();
                const x = ((e.clientX - left) / width) * 100;
                const y = ((e.clientY - top) / height) * 100;

                zoomImage.style.transformOrigin = `${x}% ${y}%`;
                zoomImage.classList.add('zoomed');
            });

            imageZoom.addEventListener('mouseleave', () => {
                zoomImage.classList.remove('zoomed');
                zoomImage.style.transformOrigin = 'center center';
            });
        }
    })


    return (
        <div className='product-detail-container'>
            <div className='product-detail-list'>
                <div className='list-img'>
                    <img src={dataProduct.img} id='zoomImage' />
                </div>
                <div className='list-content'>
                    <div className='list-price-name-sold'>
                        <h2>{dataProduct.product_name}</h2>
                        <h4>Đã bán: {dataProduct.quantity_sold}</h4>
                        <h4 style={{ marginTop: '36px', marginBottom: '-2px', fontWeight: 'bold' }}>{formatVND(dataProduct.price - dataProduct.price * (dataProduct.discount / 100))} ₫</h4>
                        <div className='product-discount' style={{ marginBottom: '16px' }}>
                            <h4 style={{ textDecoration: 'line-through', color: '#7c7c7c', fontWeight: '100', fontSize: '19px' }}>{formatVND(dataProduct.price)} ₫ </h4>
                            <h4 style={{ color: 'red' }}>{dataProduct.discount}%</h4>
                        </div>
                    </div>
                    <div className='list-size'>
                        <div className='list-size-right'>
                            <h3>Kích cỡ:  {size}</h3>
                            <div className='list-size-btn'>
                                {dataProductDetail.map(item => (
                                    <button
                                        key={item.id_prod}
                                        onClick={() => {
                                            handleSizeSelect(item.id_prod, item.size);
                                            dispatch(addSize({ id_prod: item.id_prod, size: item.size }))
                                        }}
                                        className={`size-btn ${selectedSize === item.id_prod ? 'selected' : ''}`}
                                    >
                                        {item.size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <p onClick={clickBangSize}><img src={Ruller} /> Gợi ý tìm size</p>
                    </div>
                    {isPopupVisible && (
                        <div className="popup-content">
                            <div className='popup-content-header'>
                                <h2>Đánh giá sản phẩm</h2>
                                <button onClick={handleSubmit}>
                                    <img src={Send} className='send' />
                                </button>
                            </div>
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`star ${star <= (hoveredStars || selectedStars) ? 'hovered' : ''}`}
                                        onMouseEnter={() => handleMouseEnter(star)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleClick(star)}
                                    >

                                    </span>
                                ))}
                            </div>
                            <textarea placeholder="Nhập đánh giá của bạn...(phần này có thể bỏ trống)" name='comments' onChange={CommentChange} />
                        </div>
                    )}
                    <div className='list-btn'>
                        <button className='cart-btn' onClick={() => dispatch(addToCart({ ...dataProduct, userId: authState.userId }))}>
                            Thêm giỏ hàng
                        </button>
                        <button className='rate-btn' onClick={clickPopup}>
                            Đánh giá
                        </button>
                    </div>
                    <hr className="line" />
                    <div className='list-mota'
                        onClick={() => {
                            clickSpan2();
                            clickMota();
                        }}>
                        <p>Mô tả</p>
                        <span
                            className={`span-icon ${isSpan2 ? 'expanded' : ''}`}
                        ></span>
                    </div>
                    {mota && isSpan2 && (
                        <div className='mota'>
                            <p>{dataProduct.description ? dataProduct.description : 'Sản phẩm hiện chưa có mô tả'}</p>
                        </div>
                    )
                    }
                    <hr className="line" />
                    <div className='list-hdsd'
                        onClick={() => {
                            clickSpan1();
                            clickHdsd();
                        }}>
                        <p>Hướng dẫn sử dụng</p>
                        <span
                            id='span-icon'
                            className={`span-icon ${isSpan1 ? 'expanded' : ''}`}
                        ></span>
                    </div>
                    {hdsd && isSpan1 && (
                        <div className='hdsd'>
                            <p>Giặt máy ở nhiệt độ thường, không ngâm.</p>
                            <p>Không sử dụng hóa chất tẩy có chứa Clo.</p>
                            <p>Phơi trong bóng mát.</p>
                            <p>Không sử dụng máy sấy.</p>
                            <p>Là ở nhiệt độ thấp 110 độ.</p>
                            <p>Giặt riêng.</p>
                            <p>Không là lên chi tiết trang trí.</p>
                            <p>Sản phẩm có thể dây màu ra màu sáng hơn.</p>
                        </div>
                    )
                    }
                    <hr className="line" />
                </div>
            </div>
            <div className='product-detail-service'>
                <div className='delivery_man'>
                    <img src={Delivery_man} />
                    <div>
                        <h2>Thanh toán khi nhận hàng(COD)</h2>
                        <h3>Giao hàng toàn quốc.</h3>
                    </div>
                </div>
                <hr />
                <div className='delivery'>
                    <img src={Delivery} />
                    <div>
                        <h2>Miễn phí giao hàng</h2>
                        <h3>Với đơn hàng trên 599.000 ₫.</h3>
                    </div>
                </div>
                <hr />
                <div className='box'>
                    <img src={Box} />
                    <div>
                        <h2>Đổi trả miễn phí</h2>
                        <h3>Trong 30 ngày kể từ ngày mua.</h3>
                    </div>
                </div>
            </div>
            <div style={{ display: 'block', padding: '12px 168px', marginBottom: '36px' }}>
                <h1 style={{ fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '18px' }}>Sản Phẩm Đã Xem Gần Đây</h1>
                <hr style={{ marginLeft: "0px" }} className="line" />
                <ProductViewed />
            </div>
            <div style={{ display: 'block', padding: '12px 168px', marginBottom: '36px' }}>
                <h1 style={{ fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '18px' }}>Gợi ý mua cùng</h1>
                <hr style={{ marginLeft: "0px" }} className="line" />
                <ProductSuggestion />
            </div>
            <div className='product-detail-rate'>
                <h1>Đánh Giá: {dataProduct.product_rate}/5 <img className='span-icon' src={Star} /></h1>
                <hr style={{ marginLeft: "0px" }} className="line" />
                {listRate.map(comments => (
                    <div>
                        <div className='list-cmt'>
                            <img src={User_item} className='icon-rate' />
                            <div className='cmt-content'>
                                <h1>{comments.customer}</h1>
                                <p>
                                    {[...Array(comments.star)].map(() => (
                                        <img src={Star} className='span-icon-rate' />
                                    ))}
                                </p>
                                <h3>{comments.comments ? comments.comments : 'Đánh giá không được viết bởi người mua'}</h3>
                                <h5>{comments.date_posted}</h5>
                            </div>
                        </div>
                        <hr style={{ marginLeft: "0px" }} className="line" />
                    </div>
                ))}
            </div>
            {loadedCount < data_rate.length && (
                <div className='load-btn' onClick={loadMore}>
                    <button>Xem Thêm</button>
                    <IoIosArrowDown style={{ color: 'rgb(170, 170, 170)' }} />
                </div>
            )}
        </div >
    );
};

export default ProductDetail;