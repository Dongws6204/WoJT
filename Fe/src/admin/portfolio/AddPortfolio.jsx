import React, { useState } from "react";
import './addport.css'
import axios from 'axios';

const AddPortfolio = () => {

    const [objects] = useState([
        { object_id: 1, object_name: "Nam" },
        { object_id: 2, object_name: "Nữ" },
        { object_id: 3, object_name: "Bé Trai" },
        { object_id: 4, object_name: "Bé Gái" },
    ]);

    const [portfolio, setPortfolio] = useState({
        object_id: '',
        port_name: ''
    });
    const [isDropdownOpen,setIsDropdownOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(portfolio);

        const fetchData = async () => {
            try {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/portfolios/`, {
                    port_name: portfolio.port_name,
                    object: portfolio.object_id,
                });

                if (res.status === 201) { // HTTP status code for created resource is 201
                    alert('Thêm danh mục thành công!');
                } else {
                    console.error("Lỗi");
                }
            } catch (error) {
                console.error("Lỗi", error);
            }
        };

        fetchData();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPortfolio((prevPortfolio) => ({
            ...prevPortfolio,
            [name]: value,
        }));
    };

    return (
        <div className="ad-portfolio">
            <h2>Thêm danh mục</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="portfolioName">Tên danh mục:</label>
                    <input
                        type="text"
                        name="port_name"
                        onChange={handleChange}
                        placeholder="Danh mục ..."
                    />
                </div>
                <div className="form-group">
                    <select
                        onFocus={() => setIsDropdownOpen(true)}
                        onBlur={() => setIsDropdownOpen(false)}
                        onChange={handleChange}
                        name="object_id"
                        style={{borderColor:'#ddd',color:'#5e5d5d'}}
                    >
                        {!isDropdownOpen && <option value="">-- Chọn Object --</option>}
                        {objects.map((obj) => (
                            <option key={obj.object_id} value={obj.object_id}>
                                {obj.object_name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" onClick={handleSubmit}>Thêm</button>
            </form>
        </div>
    );
};

export default AddPortfolio;
