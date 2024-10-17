import { memo, useState, useEffect, useContext } from "react";
import { ContextCheckLogin } from "../../../router";

import Body from "../layout/body";

import './homePage.css'

const ListHome = () => {
    const products = [
        {
            id: 1,
            name: 'Áo phông Oversize',
            description: 'Áo phông oversize chất cotton mềm mại, màu trắng, phù hợp với nhiều phong cách.',
            price: 299000,
            images: ['anh-ao-phong-1.jpg', 'anh-ao-phong-2.jpg'],
            colors: ['Trắng', 'Đen', 'Xanh dương'],
            sizes: ['S', 'M', 'L', 'XL'],
            materials: 'Cotton 100%',
            brand: 'YourBrand',
            category: 'Áo',
        },
        {
            id: 2,
            name: 'Quần jeans Slim Fit',
            description: 'Quần jeans slim fit với chất liệu denim co giãn, màu xanh đậm, phù hợp với nhiều phong cách.',
            price: 499000,
            images: ['anh-quan-jeans-1.jpg', 'anh-quan-jeans-2.jpg'],
            colors: ['Xanh đậm', 'Đen'],
            sizes: ['28', '30', '32', '34'],
            materials: 'Denim 98%, Spandex 2%',
            brand: 'YourBrand',
            category: 'Quần',
        },
        {
            id: 3,
            name: 'Áo khoác Bomber',
            description: 'Áo khoác bomber với chất liệu vải dù, màu đen, phong cách trẻ trung và năng động.',
            price: 799000,
            images: ['anh-ao-khoac-1.jpg', 'anh-ao-khoac-2.jpg'],
            colors: ['Đen', 'Xanh rêu'],
            sizes: ['M', 'L', 'XL'],
            materials: 'Polyester 100%',
            brand: 'YourBrand',
            category: 'Áo khoác',
        },
        {
            id: 3,
            name: 'Áo khoác Bomber',
            description: 'Áo khoác bomber với chất liệu vải dù, màu đen, phong cách trẻ trung và năng động.',
            price: 799000,
            images: ['anh-ao-khoac-1.jpg', 'anh-ao-khoac-2.jpg'],
            colors: ['Đen', 'Xanh rêu'],
            sizes: ['M', 'L', 'XL'],
            materials: 'Polyester 100%',
            brand: 'YourBrand',
            category: 'Áo khoác',
        },
        {
            id: 3,
            name: 'Áo khoác Bomber',
            description: 'Áo khoác bomber với chất liệu vải dù, màu đen, phong cách trẻ trung và năng động.',
            price: 799000,
            images: ['anh-ao-khoac-1.jpg', 'anh-ao-khoac-2.jpg'],
            colors: ['Đen', 'Xanh rêu'],
            sizes: ['M', 'L', 'XL'],
            materials: 'Polyester 100%',
            brand: 'YourBrand',
            category: 'Áo khoác',
        },
        {
            id: 3,
            name: 'Áo khoác Bomber',
            description: 'Áo khoác bomber với chất liệu vải dù, màu đen, phong cách trẻ trung và năng động.',
            price: 799000,
            images: ['anh-ao-khoac-1.jpg', 'anh-ao-khoac-2.jpg'],
            colors: ['Đen', 'Xanh rêu'],
            sizes: ['M', 'L', 'XL'],
            materials: 'Polyester 100%',
            brand: 'YourBrand',
            category: 'Áo khoác',
        },
        {
            id: 3,
            name: 'Áo khoác Bomber',
            description: 'Áo khoác bomber với chất liệu vải dù, màu đen, phong cách trẻ trung và năng động.',
            price: 799000,
            images: ['anh-ao-khoac-1.jpg', 'anh-ao-khoac-2.jpg'],
            colors: ['Đen', 'Xanh rêu'],
            sizes: ['M', 'L', 'XL'],
            materials: 'Polyester 100%',
            brand: 'YourBrand',
            category: 'Áo khoác',
        },

        // Thêm nhiều sản phẩm hơn nếu cần
    ];

    const [visibleProducts, setVisibleProducts] = useState(products.slice(0, 3));

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleProducts(prevProducts => {
                const newProducts = [...prevProducts];
                newProducts.push(newProducts.shift());
                return newProducts;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>
                Deal hot
            </h1>
            <div className="product-list">


                {visibleProducts.map(product => (
                    <div key={product.id} className="product-item">
                        <img src={product.images[0]} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Giá: {product.price} VND</p>
                    </div>
                ))}
            </div>

            <h1>
                Deal sốc
            </h1>

            <div className="product-list">


                {visibleProducts.map(product => (
                    <div key={product.id} className="product-item">
                        <img src={product.images[0]} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Giá: {product.price} VND</p>
                    </div>
                ))}
            </div>


            <h1>
                Deal sốc
            </h1>

            <div className="product-list">


                {visibleProducts.map(product => (
                    <div key={product.id} className="product-item">
                        <img src={product.images[0]} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Giá: {product.price} VND</p>
                    </div>
                ))}
            </div>
        </div>

    );
};


const HomePage = () => {
    const { checkLogin, setCheckLogin } = useContext(ContextCheckLogin);
    if (checkLogin) {
        return (
            <div>
                <ListHome />
            </div>
        );
    }
    else {
        return (
            <div>
                <Body>
                    <ListHome />
                </Body>
            </div>
        )
    }

}

export default memo(HomePage);