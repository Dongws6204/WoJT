import React from 'react';
import './listportfolio.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from '../../Products/ProductCard/ProductCard';
import { useLocation } from 'react-router-dom';

const ListPortfolio = () => {

    const object_name = localStorage.getItem('object_name');
    const port_name = localStorage.getItem('port_name');
    const [data,setData] = useState([]);
    const location = useLocation();
    const port_id = location.state?.portId;
    const discounts = 30;

    useEffect(() => {
        const fetchData = async () => {
            if (port_id) {
                try {
                    const response = await axios.get(
                        `http://127.0.0.1:8000/api/products/portfolio/${port_id}`
                    );
                    //kiem tra neu response goi thanh cong
                    if (response.status === 200) {
                        setData(response.data.products);
                    } else {
                        console.error("Lỗi khi truy cập:", response.status);
                    }
                } catch (error) {
                    console.error("Lỗi khi lấy dữ liệu:", error);
                }
            }
        };

        fetchData();

    }, [port_id]);

    return (
        <>
            <div className='link_content'>
                <h1>Trang chủ | {object_name} | {port_name}</h1>
            </div>
            <div className='list-product-portfolio'>
            {data.map((item) => (
                    <ProductCard
                    key={item.product_id} id={item.product_id} image={item.img} name={item.product_name} total={item.price} discount ={discounts}
                    />
                ))}
            </div>
        </>
    );
};

export default ListPortfolio;