import React, { useState, useEffect } from "react";
import axios from "axios";
import './addport.css'

const FixPortfolio = ({ portID }) => {

    const [objects] = useState([
        { object_id: 1, object_name: "Nam" },
        { object_id: 2, object_name: "Nữ" },
        { object_id: 3, object_name: "Bé Trai" },
        { object_id: 4, object_name: "Bé Gái" },
    ]);

    const [portfolio, setPortfolio] = useState({
        // object_id: '2',
        // port_name: 'Quan dui ao balo'
    });

    const [selectedObject, setSelectedObject] = useState(portfolio.object_id);

    // const [portfolio, setPortfolio] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/admin/portfolios/delete/${portID}`
                );
                //kiem tra neu response goi thanh cong
                if (response.status === 200) {

                    setPortfolio(response.data);
                } else {
                    console.error("Lỗi khi truy cập:", response.status);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        if (portID) {
            fetchData();
        }
    }, [portID]);


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(portfolio)
    // };
    // Gửi yêu cầu cập nhật danh mục
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/admin/portfolios/delete/${portfolio.id_port}`,
                {
                    port_name: portfolio.port_name,
                    object: portfolio.object_id,
                }
            );

            if (response.status === 200) {
                alert("Cập nhật danh mục thành công!");
            } else {
                alert("Cập nhật thất bại. Vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật danh mục:", error);
            alert("Đã xảy ra lỗi trong quá trình cập nhật.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPortfolio((prevPortfolio) => ({
            ...prevPortfolio,
            [name]: value,
        }));
    };

    const handleObjectChange = async (e) => {
        const objectId = e.target.value;
        setSelectedObject(objectId);
        setPortfolio(
            { ...portfolio, object_id: objectId }
        );
    };

    return (
        <div className="ad-portfolio">
            <h2>Sửa danh mục</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="portfolioName">Tên Portfolio:</label>
                    <input
                        type="text"
                        name="port_name"
                        onChange={handleChange}
                        placeholder="Danh mục ..."
                        value={portfolio.port_name || ""}
                    />
                </div>
                <div className="form-group">
                    <select
                        onChange={handleObjectChange}
                        name="object_id"
                        value={selectedObject || ""}
                        style={{borderColor:'#ddd',color:'#5e5d5d'}}
                    >
                        <option value="">-- Chọn Object --</option>
                        {objects.map((obj) => (
                            <option key={obj.object_id} value={obj.object_id}>
                                {obj.object_name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Cập nhật</button>
            </form>
        </div>
    );
};

export default FixPortfolio;
