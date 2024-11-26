import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';

const Search = () => {

    const location = useLocation();
    const search_content = location.state?.search;

    const searchData = [
        {
            "product_id": 25,
            "img": "https://canifa.com/img/500/750/resize/8/t/8ts25a002-se409-xl-1-u.webp",
            "product_name": "Áo phông nam",
            "price": "149000.00"
        },
        {
            "product_id": 26,
            "img": "https://canifa.com/img/500/750/resize/8/t/8tl24w002-sk010-thumb.webp",
            "product_name": "Áo phông dài tay nam",
            "price": "499000.00"
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
            "product_id": 29,
            "img": "https://canifa.com/img/500/750/resize/8/t/8ts24w002-sg650-thumb.webp",
            "product_name": "Áo phông nam in chữ",
            "price": "299000.00"
        },
        {
            "product_id": 30,
            "img": "https://canifa.com/img/500/750/resize/8/t/8ts24w002-sk010-thumb.webp",
            "product_name": "Áo phông nam in chữ",
            "price": "299000.00"
        },
        {
            "product_id": 31,
            "img": "https://canifa.com/img/500/750/resize/8/t/8ts24w001-sg650-thumb.webp",
            "product_name": "Áo phông nam in chữ",
            "price": "299000.00"
        },
        {
            "product_id": 32,
            "img": "https://canifa.com/img/500/750/resize/8/t/8tl24w007-se384-thumb.webp",
            "product_name": "Áo phông dài tay nam",
            "price": "499000.00"
        },
        {
            "product_id": 33,
            "img": "https://canifa.com/img/500/750/resize/8/t/8ts24a001-sb001-thumb.webp",
            "product_name": "Áo phông nam cổ tròn dáng suông",
            "price": "149000.00"
        },
    ]

    return (
        <>
            <div className='link_content'>
                <h1>{searchData.length} kết quả cho <span style={{fontWeight:'bold'}}>'{search_content}'</span></h1>
            </div>
            <div className='list-product-portfolio'>
            {searchData.map((item) => (
                    <ProductCard
                    key={item.product_id} id={item.product_id} image={item.img} name={item.product_name} total={item.price}
                    />
                ))}
            </div>
        </>
    );
};

export default Search;