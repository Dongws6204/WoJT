import React, { useState, useEffect } from 'react';
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
    const [addProduct, setAddProduct] = useState(false);
    const [fixProduct, setFixProduct] = useState(false);
    const [productID, setProductID] = useState(null);
    const [update, setUpdate] = useState(false);


    const toggleSizes = (id) => {
        setSelectProduct(id);
        setShowSizes(true);
    };

    const LeaveTogglesSize = () => {
        setSelectProduct(null);
        setShowSizes(false);
    }

    const formatVND = (number) => {
        const price = parseFloat(number)
        return price.toLocaleString('vi-VN');
    };

    const [data, setData] = useState([
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/admin/products/all`
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
        };

        fetchData();
    }, [search, update]);

    const OnlickSearch = () => {
        // console.log(search)
        const searchTerm = search.toLowerCase(); // Giả sử searchInput là giá trị nhập vào của người dùng
        const filteredProducts = data.filter(product => {
            const portName = product.product_name || ''; // Đảm bảo port_name không phải là undefined
            return portName.toLowerCase().includes(searchTerm);
        });
        setData(filteredProducts);
        alert(`Đã tìm thấy ${filteredProducts.length} kết quả cho ${search}`);
    };

    const deleteProduct = (id) => {
        // console.log(id);
        const deleteData = async () => {
            try {
                // Sử dụng id trong URL thay vì body
                const res = await axios.delete(
                    `${import.meta.env.VITE_API_URL}/admin/products/delete/${id}/`
                );
                if (res.status === 200) {
                    alert(`Xoá thành công danh mục có id ${id}`);
                    window.location.reload();
                } else {
                    alert('Xoá thất bại');
                }
            } catch (error) {
                console.error("Lỗi khi xoá sản phẩm :", error);
                alert('Đã có lỗi xảy ra');
            }
        };

        deleteData();
    };



    const onClickInsert = () => {
        setAddProduct(true);
    }

    const onClickFix = (id) => {
        setProductID(id);
        scrollToTop();
        setFixProduct(true);
    }

    const closeWindos = () => {
        setAddProduct(false);
    }

    const closeWindoss = () => {
        setFixProduct(false);
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Cuộn mượt mà
        });
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
                                        {product.img_1 ? (
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <img
                                                    src={product.img_1}
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
                                            <IoEyeOutline onMouseEnter={() => { toggleSizes(product.product_id) }} onMouseLeave={LeaveTogglesSize} />
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
                                        <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
                                            <IoMdSettings onClick={() => { onClickFix(product.product_id) }} /><span style={{ margin: '0px 5px' }}>|</span>
                                            <MdDelete onClick={() => deleteProduct(product.product_id)} />
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
                                height: '368%',
                                backgroundColor: 'rgba(76, 79, 77, 0.5)',
                                display: 'flex',
                                justifyContent: 'center',
                                top: 0,
                                left: 0
                            }}>
                                 <AddProductForm />
                        </div>
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
                                height: '368%',
                                backgroundColor: 'rgba(76, 79, 77, 0.5)',
                                display: 'flex',
                                justifyContent: 'center',
                                top: 0,
                                left: 0
                            }}>
                                <FixProductForm productID={productID} setFixProduct={setFixProduct}/>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default AdminProduct;