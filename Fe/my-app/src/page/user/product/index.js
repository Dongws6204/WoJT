import React, { memo, useState } from 'react';


const Tiltle = () => {
    return (
        <div>
            <h1>Tilte Product</h1>
        </div>
    );
}

const Star = () => {
    return (
        <div>
            <table>
                <tr>
                    <td><img src="" alt="start">
                    </img>Start

                    </td>
                    <td>
                        Đánh giá
                    </td>
                    <td>Đã bán</td>
                </tr>
            </table>
        </div>
    );
}

const Price = () => {
    return (
        <div>
            Price Products
        </div>
    );
}

const DescriptionProduct = () => {
    const [quantity, setQuantity] = useState(1);
    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };
    const handleDecrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };
    const handleChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    return (
        <table>
            <tr>
                <th>Mã giảm giá</th>
                <td>Nội dung 1</td>
            </tr>
            <tr>
                <th>Vận chuyển</th>
                <td>Nội dung 3</td>
                <td>Nội dung 4</td>
            </tr>
            <tr>
                <th>Màu sắc</th>
                <td>Nội dung 5</td>
                <td>Nội dung 6</td>
            </tr>
            <tr>
                <th>Size</th>
            </tr>
            <tr>
                <th>Số lượng</th>

                <div>
                    <button >-</button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={handleChange}
                        min="1"
                    />
                    <button onClick={handleIncrement}>+</button>
                </div>

            </tr>
        </table>
    );
}


const BodyProduct = () => {
    return (
        <div>
            <p> Product</p>
            <Tiltle />
            <Star />
            <Price />
            <DescriptionProduct />
        </div>
    );
}

const Review = () => {
    return (
        <div>
            Review
        </div>
    );
}

const ProductDetail = () => {
    return (
        <p>
            ProductDetail
        </p>
    );
}
const Products = () => {

    return (
        <div>
            <BodyProduct />
            <Review />
            <ProductDetail />
        </div>

    );
}

export default memo(Products);

