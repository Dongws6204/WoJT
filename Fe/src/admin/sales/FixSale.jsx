import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './fixsale.css'

const FixSale = ({saleID}) => {

    const [sales, setSales] = useState(
        {
            product_id: 33,
            img: "https://canifa.com/img/500/750/resize/8/t/8ts24a001-sb001-thumb.webp",
            product_name: "Áo phông nam cổ tròn dáng suông",
            price: 149000.00,
            sale_id: 2,
            discount: 30,
        },
    )

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/product/sale/${saleID}`
                );
                //kiem tra neu response goi thanh cong
                if (response.status === 200) {
                    setSales(response.data);
                } else {
                    console.error("Lỗi khi truy cập:", response.status);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        if (saleID) {
            fetchData();
        }
    }, [saleID]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSales((data) => ({
            ...data,
            [name]: value
        }));
    };

    const formatVND = (number) => {
        const price = parseFloat(number)
        return price.toLocaleString('vi-VN');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(sales)
        try {
            const response = await fetch("/api/addproduct", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sales),
            });
            if (response.ok) {
                alert("Sửa sản phẩm thành công!");
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className='admin-sale-container'>
            <h1 style={{fontSize:'22px'}}>Quản Lý Khuyến Mãi</h1>
            <div className="sale-form">
                <form onSubmit={handleSubmit}>
                    <label>
                        Sản phẩm:
                        <input
                            type="text"
                            name="product_name"
                            value={sales.product_name}
                            onChange={handleInputChange}
                            readOnly
                        />
                    </label>
                    <label>
                        Giá:
                        <input
                            type="text"
                            name="price"
                            value={formatVND(sales.price - sales.price * (sales.discount/100))}
                            onChange={handleInputChange}
                            readOnly
                        />
                    </label>
                    <label>
                        Discount:
                        <input
                            type="number"
                            name="discount"
                            value={sales.discount}
                            onChange={handleInputChange}
                        />
                    </label>
                        <button type="submit">
                            Cập Nhật
                        </button>
                </form>
            </div>
        </div>
    );
};

export default FixSale;