import React, { useState, useEffect } from "react";
import { IoMdSettings } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import './adminsale.css'
import FixSale from "./FixSale";
import axios from "axios";

const AdminSales = () => {
    // Dữ liệu khuyến mãi
    const [sales, setSales] = useState([
        {
            product_id: 33,
            img: "https://canifa.com/img/500/750/resize/8/t/8ts24a001-sb001-thumb.webp",
            product_name: "Áo phông nam cổ tròn dáng suông",
            price: 149000.00,
            sale_id: 2,
            discount: 30,
        },
        {
            product_id: 34,
            img: "https://canifa.com/img/500/750/resize/8/t/8tl24w007-se384-thumb.webp",
            product_name: "Áo phông nam cổ tròn dáng suông",
            price: 159000.00,
            sale_id: 1,
            discount: 50,
        }
    ]);


    //  API admin sales laf http://127.0.0.1:8000/api/admin/sales/
    const OnlickSearch = async (e) => {
        e.preventDefault();
        console.log(search);
        if (search) {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/search/sales`
                );
                //kiem tra neu response goi thanh cong
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    console.error("Lỗi khi truy cập:", response.status);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        }
    }

    const formatVND = (number) => {
        const price = parseFloat(number)
        return price.toLocaleString('vi-VN');
    };

    const [isEditing, setIsEditing] = useState(false);
    const [search, setSearch] = useState(null);
    const [saleID, setSaleID] = useState(null);

    const onClickFix = (id) => {
        setSaleID(id);
        setIsEditing(true);
    }

    const closeWindos = () => {
        setIsEditing(false);
    }

    return (
        < >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className='admin-search'>
                    <input type="text" placeholder='search...' style={{ border: 'none', width: '92%' }} onChange={(e) => { setSearch(e.target.value) }} />
                    <IoSearchOutline style={{ width: '22px', height: '22px', color: '#757575', cursor: 'pointer' }} onClick={OnlickSearch} />
                </div>
            </div>
            <hr className="linE" />

            <div className="admin-sales">
                <h2>Danh Sách Khuyến Mãi</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Sale ID</th>
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Sale</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => (
                            <tr key={sale.sale_id}>
                                <td>{sale.sale_id}</td>
                                <td>
                                    <img src={sale.img} alt="Product" style={{ width: "68px", height: "86px" }} />
                                </td>
                                <td>{sale.product_name}</td>
                                <td>{formatVND(sale.price - sale.price * (sale.discount / 100))} ₫</td>
                                <td>{sale.discount}%</td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
                                        <IoMdSettings onClick={() => { onClickFix(sale.sale_id) }} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isEditing && (
                    <>
                        <div
                            onClick={closeWindos}
                            style={{
                                position: "absolute",
                                zIndex: "10",
                                width: '100vw',
                                height: '168%',
                                backgroundColor: 'rgba(76, 79, 77, 0.5)',
                                display: 'flex',
                                justifyContent: 'center',
                                top: 0,
                                left: 0
                            }}>
                        </div>
                        <FixSale saleID={saleID} />
                    </>
                )}
            </div>
        </>
    );
};

export default AdminSales;
