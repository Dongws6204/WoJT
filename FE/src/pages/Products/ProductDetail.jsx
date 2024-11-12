import React, { useState, useEffect } from 'react';
import './productdetail.css'
import Star from '../../assets/star.png'
import Box from '../../assets/box.png'
import Delivery from '../../assets/delivery-van.png'
import Delivery_man from '../../assets/delivery-man.png'
import User_item from '../../assets/user_1.png'
import Send from '../../assets/send.png'
import { useDispatch} from 'react-redux';
import Ruller from '../../assets/ruller.png'
import { addToCart, addSize } from '../../redux/Slice/cartSlice'

const ProductDetail = () => {

    const productDetailData =
    {
        product_id: 8,
        product_name: 'Quần jeans nam phom relaxed',
        price: 499000,
        img: 'https://canifa.com/img/1517/2000/resize/8/b/8bj24w004-sj890-31-1-u.webp',
        description: null,
        product_rate: 4.8,
        quantity_sold: 0,
        quantity_stock: '150',
        product_detail: [
            {
                id_prod: 1,
                size: 'S'
            },
            {
                id_prod: 2,
                size: 'M'
            },
            {
                id_prod: 3,
                size: 'L'
            },
            {
                id_prod: 4,
                size: 'XL'
            },
            {
                id_prod: 5,
                size: 'XXL'
            }
        ],
        rate: [
            {
                cutomer_name: 'sann',
                date_post: '27-10-2024',
                star: 5,
                comment: 'Đây thực sự là một sản phẩm tuyệt vời! Tôi rất ấn tượng với sự tỉ mỉ và chất lượng trong từng chi tiết. Không chỉ đáp ứng kỳ vọng, mà còn vượt xa mong đợi của tôi. Cảm ơn vì đã mang đến một trải nghiệm tuyệt vời như vậy. Tôi chắc chắn sẽ giới thiệu sản phẩm này đến bạn bè và người thân!',
            },
            {
                cutomer_name: 'HoquangSang',
                date_post: '27-10-2024',
                star: 4,
                comment: 'san pham rat tot, se mua them',
            },
            {
                cutomer_name: 'sann3',
                date_post: '27-10-2024',
                star: 2,
                comment: '',
            },
        ]
    }

    const [selectedSize, setSelectedSize] = useState(null); //id_prod
    const [size, setSize] = useState('');//size_name
    const [mota, setMota] = useState(false);
    const [hdsd, setHdsd] = useState(false);
    const [isSpan1, setIsSpan1] = useState(false);
    const [isSpan2, setIsSpan2] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [hoveredStars, setHoveredStars] = useState(0);
    const [selectedStars, setSelectedStars] = useState(0); // Trạng thái lưu số ngôi sao đã chọn
    const [dataRate, setDataRate] = useState({
        comments: '',
        star: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("formdata", dataRate);
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

    const clickPopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const formatVND = (number) => {
        return number.toLocaleString('vi-VN');
    };

    const clickMota = async () => {
        setMota(!mota)
    }

    const clickSpan1 = () => {
        setIsSpan1(!isSpan1);
    };

    const clickSpan2 = () => {
        setIsSpan2(!isSpan2);
    };

    const clickHdsd = async () => {
        setHdsd(!hdsd)
    }

    const handleSizeSelect = async (size, size_name) => {
        setSelectedSize(size)
        setSize(size_name)
        //
    };

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
                    <img src={productDetailData.img} id='zoomImage' />
                </div>
                <div className='list-content'>
                    <div className='list-price-name-sold'>
                        <h2>{productDetailData.product_name}</h2>
                        <h4>Đã bán: {productDetailData.quantity_sold}</h4>
                        <p>{formatVND(productDetailData.price)} ₫</p>
                    </div>
                    <div className='list-size'>
                        <div className='list-size-right'>
                            <h3>Kích cỡ:  {size}</h3>
                            <div className='list-size-btn'>
                                {productDetailData.product_detail.map((item) => (
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
                        <p><img src={Ruller} /> Gợi ý tìm size</p>
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
                        <button className='cart-btn' onClick={() => dispatch(addToCart(productDetailData))}>
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
                            <p>{productDetailData.description ? productDetailData.description : 'Sản phẩm hiện chưa có mô tả'}</p>
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
            <div className='product-detail-rate'>
                <h1>Đánh Giá: {productDetailData.product_rate}/5 <img className='span-icon' src={Star} /></h1>
                <hr style={{ marginLeft: "0px" }} className="line" />
                {productDetailData.rate.map(comments => (
                    <div>
                        <div className='list-cmt'>
                            <img src={User_item} className='icon-rate' />
                            <div className='cmt-content'>
                                <h1>{comments.cutomer_name}</h1>
                                <p>
                                    {[...Array(comments.star)].map(() => (
                                        <img src={Star} className='span-icon-rate' />
                                    ))}
                                </p>
                                <h3>{comments.comment ? comments.comment : 'Đánh giá không được viết bởi người mua'}</h3>
                                <h5>{comments.date_post}</h5>
                            </div>
                        </div>
                        <hr style={{ marginLeft: "0px" }} className="line" />
                    </div>
                ))}
            </div>
        </div >
    );
};

export default ProductDetail;