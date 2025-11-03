import React, { useEffect, useState } from 'react';
import './dash.css'
import axios from 'axios';

const AdminDashboard = () => {
    const [stats, setStats] = useState({});
    const [recentOrders, setRecentOrders] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        // Fake API Call
        const fetchDashboardData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/order`);
                const data = res.data.map(order => {
                    if (order.total_amount === null) {
                        order.total_amount = 0;
                    }
                    return order;
                });
                setRecentOrders(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Không thể lấy dữ liệu. Vui lòng thử lại sau!');
            }


            // Fake statistics data
            const statsData = {
                totalProducts: 150,
                totalOrders: 320,
                totalRevenue: 54300000,
                totalCustomers: 120,
            };
            // //chi lay 5 or 10 don
            // const ordersData = [
            //     { order_id: 1, username: "Nguyễn Văn A", total_amount: 250000, status: 1 },
            //     { order_id: 2, username: "Trần Thị B", total_amount: 320000, status: 2 },
            //     { order_id: 3, username: "Lê Văn C", total_amount: 150000, status: 3 },
            //     { order_id: 4, username: "Trần Thị B", total_amount: 320000, status: 2 },
            //     { order_id: 5, username: "Lê Văn C", total_amount: 150000, status: 3 },
            // ];
            //chi lay 5 san pham ban chay nhat
            const productsData = [
                { product_name: "Áo thun Nam", quantity_sold: 80, price: 200000 },
                { product_name: "Quần jeans Nữ", quantity_sold: 50, price: 450000 },
                { product_name: "Giày thể thao Bé trai", quantity_sold: 35, price: 500000 },
                { product_name: "Quần jeans Nam", quantity_sold: 50, price: 450000 },
                { product_name: "Giày thể thao Bé gái", quantity_sold: 35, price: 500000 }
            ];

            // Set data
            setStats(statsData);
            // setRecentOrders(ordersData);
            setTopProducts(productsData);
        };

        fetchDashboardData();
    }, []);

    const formatVND = (number) => {
        const price = parseFloat(number)
        return price.toLocaleString('vi-VN');
    };

    return (
        <div className="dashboard-container">
            <div className="stats-container">
                <div className="stat-card">
                    <h2>{stats.totalProducts}</h2>
                    <p>Sản phẩm</p>
                </div>
                <div className="stat-card">
                    <h2>{stats.totalOrders}</h2>
                    <p>Đơn hàng</p>
                </div>
                <div className="stat-card">
                    <h2>{formatVND(stats.totalRevenue)}</h2>
                    <p>Doanh thu</p>
                </div>
                <div className="stat-card">
                    <h2>{stats.totalCustomers}</h2>
                    <p>Khách hàng</p>
                </div>
            </div>

            <div className="recent-orders">
                <h2>Đơn hàng gần đây</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Mã ĐH</th>
                            <th>Khách hàng</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.customer_name}</td>
                                <td>{order.total_amount.toLocaleString()} VND</td>
                                <td>
                                    {order.status === 1
                                        ? "Đã đặt"
                                        : order.status === 2
                                            ? "Đang giao"
                                            : "Đã giao"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="top-products">
                <h2>Sản phẩm bán chạy</h2>
                <ul>
                    {topProducts.map((product, index) => (
                        <li key={index}>
                            <strong>{product.product_name}</strong> - {product.quantity_sold} sản phẩm - Giá{" "}
                            {product.price.toLocaleString()} VND
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;