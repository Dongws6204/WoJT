import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import axios from 'axios';
import './port.css'
import AddPortfolio from './AddPortfolio';
import FixPortfolio from './FixPortfolio';


// export const UpdateContext = createContext();



const AdminPortfolio = () => {

    const [data, setData] = useState([])
    const [selectedObjectId, setSelectedObjectId] = useState("0");
    const [filteredPortfolio, setFilter] = useState([]);
    const [search, setSearch] = useState(null);
    const [addPort, setAddPort] = useState(false);
    const [fixPort, setFixPort] = useState(false);
    const [portID, setPortID] = useState(null);
    const [update, setUpdate] = useState(false);

    const closeWindoss = () => {
        setFixPort(false);
    }

    const onClickInsert = () => {
        setAddPort(true);
    }

    const onClickFix = (id) => {
        setPortID(id);
        setFixPort(true);
    }

    const closeWindos = () => {
        setAddPort(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/products/list-object`
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

        fetchData();
    }, [search]);

    useEffect(() => {
        if (Number(selectedObjectId) === 0) {
            setFilter(
                data.flatMap((obj) =>
                    obj.portfolio.map((portfolio) => ({
                        ...portfolio,
                        object_name: obj.object_name,
                    }))
                )
            );
        } else {
            setFilter(
                data
                    .filter((obj) => obj.object_id === Number(selectedObjectId))
                    .flatMap((obj) =>
                        obj.portfolio.map((portfolio) => ({
                            ...portfolio,
                            object_name: obj.object_name,
                        }))
                    )
            );
        }
    }, [selectedObjectId, data]);



    const handleSelectChange = (e) => {
        setSelectedObjectId(e.target.value);
    };

    const deletePort = (id) => {
        console.log(id);
        const deleteData = async () => {
            try {
                // Sử dụng id trong URL thay vì body
                const res = await axios.delete(
                    `http://127.0.0.1:8000/api/admin/portfolios/delete/${id}`
                );
                if (res.status === 200) {
                    alert(`Xoá thành công danh mục có id ${id}`);
                    window.location.reload();
                } else {
                    alert('Xoá thất bại');
                }
            } catch (error) {
                console.error("Lỗi khi xoá danh mục:", error);
                alert('Đã có lỗi xảy ra');
            }
        };

        deleteData();
    };


    const OnlickSearch = () => {
        // console.log()
        const searchTerm = search.toLowerCase(); // Giả sử searchInput là giá trị nhập vào của người dùng
        const filteredPortfolios = filteredPortfolio.filter(portfolio => {
            const portName = portfolio.port_name || ''; // Đảm bảo port_name không phải là undefined
            return portName.toLowerCase().includes(searchTerm);
        });
        setFilter(filteredPortfolios);
        alert(`Đã tìm thấy ${filteredPortfolios.length} kết quả cho ${search}`);
    };



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
            <div className='port-table'>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1>Danh sách danh mục</h1>
                    <div>
                        <select onChange={handleSelectChange} value={selectedObjectId}>
                            <option value="0">Tất cả</option>
                            <option value="1">Nam</option>
                            <option value="2">Nữ</option>
                            <option value="3">Bé Trai</option>
                            <option value="4">Bé Gái</option>
                        </select>
                    </div>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }} className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên danh mục</th>
                            <th>Đối tượng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPortfolio.map((portfolio) => (
                            <tr key={portfolio.id_port}>
                                <td>{portfolio.id_port}</td>
                                <td>{portfolio.port_name}</td>
                                <td>{portfolio.object_name}</td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
                                        <IoMdSettings onClick={() => onClickFix(portfolio.id_port)} />
                                        <span style={{ margin: '0px 5px' }}>|</span>
                                        <MdDelete onClick={() => deletePort(portfolio.id_port)} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {addPort && (
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
                        <AddPortfolio />
                    </>
                )}
                {fixPort && (
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
                        <FixPortfolio portID={portID} />
                    </>
                )}
            </div>

        </>
    );
};

export default AdminPortfolio;