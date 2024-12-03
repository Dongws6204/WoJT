import React, { useState,useEffect } from "react";
import './addproduct.css'
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const AddProductForm = () => {

    const dataFake = [
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
    ]

    const [objects] = useState([
        { object_id: 1, object_name: "Nam" },
        { object_id: 2, object_name: "Nữ" },
        { object_id: 3, object_name: "Bé Trai" },
        { object_id: 4, object_name: "Bé Gái" },
    ]);

    const [selectedObject, setSelectedObject] = useState(null);
    const [portfolios, setPortfolios] = useState(dataFake);


    const handleObjectChange = async (e) => {
        const objectId = e.target.value;
        setSelectedObject(objectId);
    };



    const handlePortfolioChange = (e) => {
        setProduct({ ...product, id_port: e.target.value });
    };

    const [product, setProduct] = useState({
        product_name: "",
        id_port: "",
        price: "",
        img: "",
        description: "",
    });

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

    const removeSize = (index) => {
        const updatedSizes = sizes.filter((_, idx) => idx !== index);
        setSizes(updatedSizes);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(sizes)
        try {
            const response = await fetch("/api/addproduct", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ product, sizes }),
            });
            if (response.ok) {
                alert("Thêm sản phẩm thành công!");
                setProduct({
                    product_name: "",
                    id_port: "",
                    price: "",
                    img: "",
                    description: "",
                });
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
                    `http://127.0.0.1:8000/api/products/${selectedObject}`
                );
                //kiem tra neu response goi thanh cong
                if (response.status === 200) {
                    setPortfolios(response.data)
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
            <h2>Thêm sản phẩm</h2>
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
                    value={product.img}
                    onChange={handleInputChange}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '8px',alignItems:'center',margin: '12px 0px' }}>
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

                {/* Dropdown chọn Portfolio */}
                {portfolios.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', margin: '12px 0px' }}>
                        <label style={{ fontSize: '16px', color: '#727272' }}>Danh mục sản phẩm:</label>
                        <select
                            id="portfolio"
                            onChange={handlePortfolioChange}
                            value={product.id_port || ""}
                        >
                            <option value="" disabled>---------------------------</option>
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
                value={product.description}
                onChange={handleInputChange}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '16px', color: '#727272' }}>Size</p>
                <CiCirclePlus onClick={addSize} style={{ width: '18px', height: '18px', color: '#727272', cursor: 'pointer' }} />
            </div>
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

            <button style={{ marginTop: '12px', width: '100%' }} type="submit">Thêm sản phẩm</button>

        </form>
    );
};

export default AddProductForm;
