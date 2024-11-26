import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useLocation } from 'react-router-dom';

const ProductSuggestion = () => {

    const [listViewed, setListViewed] = useState([]);
    const [leftCount, setLeftCount] = useState(0);
    const [rightCount, setRightCount] = useState(4);
    const discounts = 30;
    const location = useLocation();
    const product_Id = location.state?.id;
    // console.log(product_Id)

    const suggestionData = [
        {
            "product_id": 25,
            "img": "https://canifa.com/img/500/750/resize/8/t/8ts25a002-se409-xl-1-u.webp",
            "product_name": "Áo phông nam",
            "price": "149000.00"
        },
        {
            "product_id": 27,
            "img": "https://canifa.com/img/500/750/resize/8/t/8tl24w005-sa815-xl-1-u.webp",
            "product_name": "Áo phông active nam",
            "price": "399000.00"
        },
        {
            "product_id": 28,
            "img": "https://canifa.com/img/500/750/resize/8/t/8ts24w004-se331-xl-1-u.webp",
            "product_name": "Áo phông nam",
            "price": "449000.00"
        },
        {
            "product_id": 33,
            "img": "https://canifa.com/img/500/750/resize/8/t/8ts24a001-sb001-thumb.webp",
            "product_name": "Áo phông nam cổ tròn dáng suông",
            "price": "149000.00"
        },
    ]

    useEffect(() => {
        // Load 4 sản phẩm đầu tiên khi component render
        setListViewed(suggestionData.slice(0, 4));
    }, []);

    const handleNext = () => {
        if (rightCount < suggestionData.length) {
            setLeftCount(leftCount + 2);
            setRightCount(rightCount + 2);
            setListViewed(suggestionData.slice(leftCount + 2, rightCount + 2));
        }
    };

    const handlePrev = () => {
        if (leftCount > 0) {
            setLeftCount(leftCount - 2);
            setRightCount(rightCount - 2);
            setListViewed(suggestionData.slice(leftCount - 2, rightCount - 2));
        }
    };

    return (
        <>
            <div className='viewed-btn'>
                <button onClick={handlePrev} disabled={leftCount <= 0}>
                    <IoIosArrowBack/>
                </button>
                <div className='viewed-product'>
                    {listViewed.map((item) => (
                        <ProductCard
                            key={item.product_id} id={item.product_id} image={item.img} name={item.product_name} total={item.price} discount={discounts}
                        />
                    ))}
                </div>
                <button
                    onClick={handleNext}
                    disabled={rightCount >= suggestionData.length}
                >
                    <IoIosArrowForward />
                </button>
            </div>
        </>


    );
};

export default ProductSuggestion;