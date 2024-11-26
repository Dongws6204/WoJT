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
        const price = parseFloat(number)
        return price.toLocaleString('vi-VN');
    };

    const navigate = useNavigate();
    const [id, setId] = useState(props.id)
    const name = createSlug(props.name)

    const handleClick = () => {
        // localStorage.setItem('product_id', id);
        navigate(`/product/${encodeURIComponent(name)}`,{
            state:{id}
        })
        scrollToTop();
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Cuộn mượt mà
        });
    }

    return (
        <div onClick={handleClick} className='product-card'>
            <div className='product-card_image'>
                <img src={props.image} />
            </div>
            <div className='prodduct-card_content'>
                <h3>{props.name}</h3>
                <h4 className='product-total'>{formatVND(props.total - props.total * (props.discount/100))} ₫</h4>
                {props.discount !== 0 && 
                    <div className='product-discount'>
                        <h4 style={{textDecoration:'line-through', color:'#4b4b4b',fontWeight:'100'}}>{formatVND(props.total)} ₫ </h4>
                        <h4 style={{color:'red'}}>{props.discount}%</h4>
                    </div>
                }
            </div>
        </div>
    );
};

export default ProductCard;