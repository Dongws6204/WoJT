import React, { useState, useEffect } from "react";
import './addproduct.css'
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const FixProductForm = ({ productID }) => {

    const dataFake = [
        {
            "product_name": "Áo phông nữ cổ tim",
            "price": "149000.00",
            "img": "https://canifa.com/img/500/750/resize/6/t/6ts25a002-sg425-m-1-u.webp",
            "description": 'ao dep',
            "id_port": 1,
            "portfolio": "Áo phông & Áo thun",//chỉ thêm vào để hiển thị lúc cập nhật data trong sql k cần quan tâm
            "object_id": 2,//chỉ thêm vào để hiển thị lúc cập nhật data trong sql k cần quan tâm
            "product_detail": [
                {
                    "id_prod": 1,
                    "size": "S",
                    "quantity_of_size": 150
                },
                {
                    "id_prod": 2,
                    "size": "M",
                    "quantity_of_size": 50
                },
                {
                    "id_prod": 3,
                    "size": "L",
                    "quantity_of_size": 50
                },
                {
                    "id_prod": 4,
                    "size": "XL",
                    "quantity_of_size": 50
                },
                {
                    "id_prod": 5,
                    "size": "2XL",
                    "quantity_of_size": 50
                }
            ]
        }
    ]

    const [dataProduct, setDataProduct] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/productss/${productID}`
                );
                //kiem tra neu response goi thanh cong
                if (response.status === 200) {

                    setDataProduct(response.data);
                } else {
                    console.error("Lỗi khi truy cập:", response.status);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        if (productID) {
            fetchData();
        }
    }, [productID]);


    const [product, setProduct] = useState(dataFake[0]);

    const [objects] = useState([
        { object_id: 1, object_name: "Nam" },
        { object_id: 2, object_name: "Nữ" },
        { object_id: 3, object_name: "Bé Trai" },
        { object_id: 4, object_name: "Bé Gái" },
    ]);

    const [selectedObject, setSelectedObject] = useState(product.object_id);
    const [portfolios, setPortfolios] = useState([
        {
            "id_port": 1,
            "port_name": "Áo phông & Áo thun"
        },
        {
            "id_port": 2,
            "port_name": "Áo nỉ & Áo Hoodie"
        },
        {
            "id_port": 3,
            "port_name": "Áo khoác"
        },
        {
            "id_port": 4,
            "port_name": "Áo & Quần giữ nhiệt"
        }
    ]);


    const handleObjectChange = async (e) => {
        const objectId = e.target.value;
        setSelectedObject(objectId);
    };

    const handlePortfolioChange = (e) => {
        setProduct({ ...product, id_port: e.target.value });
    };

    const [sizes, setSizes] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const addSize = () => {
        setSizes([...sizes, { size: "", quantity_of_size: "" }]);
    };

    const updateSize = (index, key, value) => {
        const updatedSizes = sizes.map((item, idx) =>
            idx === index ? { ...item, [key]: value } : item
        );
        setSizes(updatedSizes);
    };

    const updateSizee = (index, key, value) => {
        setProduct((prevProduct) => {
            const updatedDetails = [...prevProduct.product_detail];
            updatedDetails[index] = {
                ...updatedDetails[index],
                [key]: value,
            };

            return {
                ...prevProduct,
                product_detail: updatedDetails,
            };
        });
    };

    const removeSizee = async (index, id) => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/products/deleteSize`, { id }
            );
            if (response.status === 200) {
                setProduct((prevProduct) => {
                    const updatedDetails = prevProduct.product_detail.filter(
                        (_, i) => i !== index
                    );
                    return {
                        ...prevProduct,
                        product_detail: updatedDetails,
                    };
                });
            } else {
                console.error("Lỗi khi truy cập:", response.status);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };



    const removeSize = (index) => {
        const updatedSizes = sizes.filter((_, idx) => idx !== index);
        setSizes(updatedSizes);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ ...product, sizes })
        try {
            const response = await fetch("/api/addproduct", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...product, sizes }),
            });
            if (response.ok) {
                alert("Sửa sản phẩm thành công!");
                setProduct([]);
                setSizes([]);
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/products/portfolio/${selectedObject}`
                );
                //kiem tra neu response goi thanh cong
                if (response.status === 200) {
                    // setPortfolios(response.data)
                } else {
                    console.error("Lỗi khi truy cập:", response.status);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        if (selectedObject) {
            fetchData();
        }
    }, [selectedObject]);


    return (
        <form onSubmit={handleSubmit} className="product-add-form">
            <h2>Sửa sản phẩm</h2>
            <input
                type="text"
                name="product_name"
                placeholder="Tên sản phẩm"
                value={product.product_name}
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="price"
                placeholder="Giá"
                value={product.price}
                onChange={handleInputChange}
            />
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '12px', color: '#727272' }}>
                <p>Ảnh :</p>
                <input
                    style={{ border: 'none', marginLeft: '-9px' }}
                    type="file"
                    name="img"
                    placeholder="Link hình ảnh"
                    onChange={handleInputChange}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', margin: '12px 0px' }}>
                    <p style={{ fontSize: '16px', color: '#727272' }}>Đối tượng:</p>
                    <select id="object" onChange={handleObjectChange} value={selectedObject || ""}>
                        <option value="" disabled>---------</option>
                        {objects.map((obj) => (
                            <option key={obj.object_id} value={obj.object_id}>
                                {obj.object_name}
                            </option>
                        ))}
                    </select>
                </div>

                {portfolios.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', margin: '12px 0px' }}>
                    <label style={{ fontSize: '16px', color: '#727272' }}>Danh mục sản phẩm:</label>
                    <select
                        id="portfolio"
                        onChange={handlePortfolioChange}
                        value={product.id_port || ""}
                    >
                        <option value="" disabled>{product.port_name}</option>
                        {portfolios.map((port) => (
                            <option key={port.id_port} value={port.id_port}>
                                {port.port_name}
                            </option>
                        ))}
                    </select>
                </div>
                )}

            </div>
            <textarea
                name="description"
                placeholder="Mô tả sản phẩm"
                value={product.description ? product.description : ""}
                onChange={handleInputChange}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '16px', color: '#727272' }}>Size</p>
                <CiCirclePlus onClick={addSize} style={{ width: '18px', height: '18px', color: '#727272', cursor: 'pointer' }} />
            </div>
            {product.product_detail.map((size, index) => (
                <div key={index} style={{ display: 'flex', gap: '12px' }}>
                    <input
                        type="string"
                        placeholder="Size"
                        value={size.size}
                        readOnly
                    />
                    <input
                        type="number"
                        placeholder="Số lượng"
                        value={size.quantity_of_size}
                        onChange={(e) => updateSizee(index, "quantity_of_size", e.target.value)}
                    />
                    <MdDelete onClick={() => removeSizee(index, size.id_prod)} style={{ width: '68px', height: '60px', color: '#727272', cursor: 'pointer' }} />
                </div>
            ))}
            {sizes.map((size, index) => (
                <div key={index} style={{ display: 'flex', gap: '12px' }}>
                    <input
                        type="string"
                        placeholder="Size"
                        value={size.size}
                        onChange={(e) => updateSize(index, "size", e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Số lượng"
                        value={size.quantity_of_size}
                        onChange={(e) => updateSize(index, "quantity_of_size", e.target.value)}
                    />
                    <MdDelete onClick={() => removeSize(index)} style={{ width: '68px', height: '60px', color: '#727272', cursor: 'pointer' }} />
                </div>
            ))}

            <button style={{ marginTop: '12px', width: '100%' }} type="submit">Lưu thay đổi</button>

        </form>
    );
};

export default FixProductForm;
