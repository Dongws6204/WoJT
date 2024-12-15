import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './product_list.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosArrowDown } from "react-icons/io";

const ProductList = () => {

    const [data, setData] = useState([]);
    const [dataAllProduct, setDataAllProduct] = useState([]);
    const [activeId, setActiveId] = useState(0);
    const [listProducts, setListProducts] = useState([]);
    const [loadedCount, setLoadedCount] = useState(15); //phan trang

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/products/`
                );
                //kiem tra neu response goi thanh cong
                if (response.status === 200) {
                    setDataAllProduct(response.data.products);
                    setData(response.data.products);
                } else {
                    console.error("Lỗi khi truy cập:", response.status);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/products/object/${activeId}`
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
        };

        if (activeId > 0) {
            fetchData();
        } else {
            setData(dataAllProduct);
        }
    }, [activeId]);

    //phan trang 
    useEffect(() => {
        setListProducts(data.slice(0, 15));
    }, [data]);

    const loadMore = () => {
        const nextCount = loadedCount + 15;
        setListProducts(data.slice(0, nextCount));
        setLoadedCount(nextCount);
    };
    //

    const onClickNavbar = (objectId) => {
        setActiveId(objectId);
    }
    return (
        <>
            <div className='navbar'>
                {[0, 1, 2, 3, 4].map(id => (
                    <div
                        key={id}
                        className={`nav_list ${activeId === id ? 'active' : ''}`}
                        onClick={() => onClickNavbar(id)}>
                        <p>{['TẤT CẢ', 'NAM', 'NỮ', 'BÉ TRAI', 'BÉ GÁI'][id]}</p>
                    </div>
                ))}
            </div>
            <div className='product-list'>
                {listProducts.map((item) => (
                    <ProductCard
                        key={item.product_id} id={item.product_id} image={item.img} name={item.product_name} total={item.price} discount={item.discount}
                    />
                ))}
            </div>

            {loadedCount < data.length && (
                <div className='load-btn' onClick={loadMore}>
                    <button>Xem Thêm</button>
                    <IoIosArrowDown style={{color:'rgb(170, 170, 170)' }}/>
                </div>
            )}

        </>
    );
};

export default ProductList;