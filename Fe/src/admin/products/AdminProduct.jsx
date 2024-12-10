import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoEyeOutline } from "react-icons/io5";
import './adminproduct.css'
import { MdDelete } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import AddProductForm from './AddProductForm';
import FixProductForm from './FixProductForm';

const AdminProduct = () => {

    const [search, setSearch] = useState(null);
    const navigate = useNavigate();
    const [showSizes, setShowSizes] = useState(false); 
    const [selectProduct, setSelectProduct] = useState(null);
    const [addProduct,setAddProduct] = useState(false);
    const [fixProduct,setFixProduct] = useState(false);
    const [productID,setProductID] = useState(null);


    const toggleSizes = (id) => {
        setSelectProduct(id);
        setShowSizes(true); 
    };

    const LeaveTogglesSize = () =>{
        setSelectProduct(null);
        setShowSizes(false); 
    }

    const formatVND = (number) => {
        const price = parseFloat(number)
        return price.toLocaleString('vi-VN');
    };

    const [data, setData] = useState([
        {
            product_id: 33,
            img: "https://canifa.com/img/500/750/resize/8/t/8ts24a001-sb001-thumb.webp",
            product_name: "Áo phông nam cổ tròn dáng suông",
            price: 149000.00,
            quantity_stock: 250,
            quantity_sold: 0,
            description: 'ao rat dep',
            product_detail: [
                {
                    size: 'S',
                    quantity_of_size: 50
                },
                {
                    size: 'M',
                    quantity_of_size: 50
                },
                {
                    size: 'L',
                    quantity_of_size: 50
                },
                {
                    size: 'XL',
                    quantity_of_size: 50
                },
                {
                    size: '2XL',
                    quantity_of_size: 50
                },
            ]
        },
        {
            product_id: 34,
            img: "https://canifa.com/img/500/750/resize/8/t/8tl24w007-se384-thumb.webp",
            product_name: "Áo phông nam cổ tròn dáng suông",
            price: 159000.00,
            quantity_stock: 150,
            quantity_sold: 0,
            description: null,
            product_detail: [
                {
                    size: 'S',
                    quantity_of_size: 50
                },
                {
                    size: 'M',
                    quantity_of_size: 50
                },
                {
                    size: 'L',
                    quantity_of_size: 50
                },
            ]
        }
    ]);

    const OnlickSearch = async (e) => {
        e.preventDefault();
        console.log(search);
        if (search) {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/search/products`
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

    const onClickInsert = () => {
        setAddProduct(true);
    }

    const onClickFix = (id) => {
        setProductID(id);
        setFixProduct(true);
    }

    const closeWindos = () => {
        setAddProduct(false);
    }

    const closeWindoss = () => {
        setFixProduct(false);
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className='admin-search'>
                    <input type="text" placeholder='search...' style={{ border: 'none', width: '92%' }} onChange={(e) => { setSearch(e.target.value) }} />
                    <IoSearchOutline style={{ width: '22px', height: '22px', color: '#757575', cursor: 'pointer' }} onClick={OnlickSearch} />
                </div>
                <div onClick={onClickInsert}>
                    <button className='admin-btn'><CiCirclePlus style={{ width: '20px', height: '20px' }} />Thêm</button>
                </div>
            </div>
            <hr className="linE" />

            <div className='product-table'>
                <h2>Danh sách sản phẩm</h2>
                <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Tồn Kho</th>
                            <th>Đã bán</th>
                            <th>Giá</th>
                            <th>Mô tả</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((product) => (
                                <tr key={product.product_id}>
                                    <td>{product.product_id}</td>
                                    <td>
                                        {product.img ? (
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <img
                                                    src={product.img}
                                                    style={{ width: "68px", height: "86px" }}
                                                />
                                            </div>
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td>{product.product_name || "N/A"}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', cursor: 'pointer' }}>
                                            <p>{product.quantity_stock || 0}</p>
                                            <IoEyeOutline onMouseEnter={()=>{toggleSizes(product.product_id)}} onMouseLeave={LeaveTogglesSize}/>
                                        </div>
                                        {showSizes && selectProduct === product.product_id && ( 
                                            <div className='product-detail-admin'>
                                                {product.product_detail.map((detail, index) => (
                                                    <p key={index} style={{ margin: "4px 0" }}>
                                                        <span>Size {detail.size} </span> :{detail.quantity_of_size}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                    <td>{product.quantity_sold}</td>
                                    <td>{formatVND(product.price)} ₫</td>
                                    <td>{product.description || "Không có mô tả"}</td>
                                    <td>
                                        <div style={{display:'flex',justifyContent:'center',cursor:'pointer'}}>
                                            <IoMdSettings onClick={()=>{onClickFix(product.product_id)}}/><span style={{margin:'0px 5px'}}>|</span><MdDelete />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" style={{ textAlign: "center" }}>
                                    No products available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {addProduct && (
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
                    <AddProductForm/>
                </>
                )}
                {fixProduct && (
                <>
                    <div
                        onClick={closeWindoss}
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
                    <FixProductForm productID = {productID}/>
                </>
                )}
            </div>
        </>
    );
};

export default AdminProduct;