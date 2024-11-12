import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './productcard.css'

const ProductCard = (props) => {

    function createSlug(name) {
        return name
            .toLowerCase()
            .trim() // Xóa khoảng trắng ở đầu và cuối
            .replace(/\s+/g, '_') // Thay thế khoảng trắng bằng dấu gạch ngang
            .replace(/-+/g, '_'); // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
    }

    const formatVND = (number) => {
        return number.toLocaleString('vi-VN');
    };

    const navigate = useNavigate();
    const [id, setId] = useState(props.id)
    const name = createSlug(props.name)

    const handleClick = () => {
        localStorage.setItem('product_id', id);
        navigate(`/product/${encodeURIComponent(name)}`)
    }

    return (
        <div onClick={handleClick} className='product-card'>
            <div className='product-card_image'>
                <img src={props.image} />
            </div>
            <div className='prodduct-card_content'>
                <h3>{props.name}</h3>
                <h4 className='product-total'>{formatVND(props.total)} ₫</h4>
            </div>
        </div>
    );
};

export default ProductCard;