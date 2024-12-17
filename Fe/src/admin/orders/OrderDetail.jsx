import React, { useState, useEffect } from 'react';
import './ordersdetail.css'

const OrderDetail = ({ orderID, res }) => {

    const fakeOrders = [
        {
            name: 'Nguyen quang sang',
            phone: '0974583072',
            address: 'nghi xuan,ha tinh',
            order_detail: [
                {
                    product_id: 1,
                    product_name: 'Quan jeans nam',
                    quantity: 1,
                    size: 'M',
                    price: 2000000,
                },

                {
                    product_id: 2,
                    product_name: 'Ao thun nam',
                    quantity: 2,
                    size: 'L',
                    price: 500000,
                },
            ],
        }
    ];

    const [selectedOrder, setSelectedOrder] = useState(fakeOrders[0]);

    useEffect(() => {
        // Kiểm tra xem res có tồn tại và là một mảng hợp lệ
        if (Array.isArray(res)) {
            const order = res.find(order => order.order_id === orderID);

            // Cập nhật selectedOrder nếu tìm thấy đơn hàng
            if (order) {
                setSelectedOrder(order);
            } else {
                console.error("Không tìm thấy đơn hàng với ID:", orderID);
            }
        } else {
            console.error("Dữ liệu res không hợp lệ");
        }
    }, [orderID, res]);


    const formatVND = (number) => {
        const price = parseFloat(number)
        return price.toLocaleString('vi-VN');
    };

    return (
        <div className='admin-orderdetail'>
            <div style={{ marginBottom: '8px' }}>
                <h2>Thông tin người nhận</h2>
                <p><strong>Khách hàng:</strong> {selectedOrder.name}</p>
                <p><strong>Số điện thoại:</strong> {selectedOrder.phone}</p>
                <p><strong>Địa chỉ:</strong> {selectedOrder.address}</p>
            </div>

            <h2>Thông tin đơn hàng</h2>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên sản phẩm</th>
                        <th>Size</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedOrder.order_detail.map((product) => (
                        <tr key={product.product_id}>
                            <td>{product.product_id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.size}</td>
                            <td>{product.quantity}</td>
                            <td>{formatVND(product.price)} VND</td>
                            <td>{formatVND(product.quantity * product.price)} VND</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderDetail;
