import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import axios from 'axios';

const Search = () => {

    const location = useLocation();
    const search_content = location.state?.search;

    const [searchData,setData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/products/`
                );
                //kiem tra neu response goi thanh cong
                if (response.status === 200) {
                    const result = response.data.products.filter(product =>
                        product.product_name.toLowerCase().includes(search_content.toLowerCase()));
                    setData(result);
                } else {
                    console.error("Lỗi khi truy cập:", response.status);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchData();
    }, [search_content]);

    return (
        <>
            <div className='link_content'>
                <h1>{searchData.length} kết quả cho <span style={{fontWeight:'bold'}}>'{search_content}'</span></h1>
            </div>
            <div className='list-product-portfolio'>
            {searchData.map((item) => (
                    <ProductCard
                    key={item.product_id} id={item.product_id} image={item.img} name={item.product_name} total={item.price} discount={item.discount}
                    />
                ))}
            </div>
        </>
    );
};

export default Search;