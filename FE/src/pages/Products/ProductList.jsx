import React from 'react';
import ProductCard from './ProductCard';
import './product_list.css'
import { useState } from 'react';

const ProductList = () => {

    const alltData = [
        {
            id: 1,
            image: 'https://canifa.com/img/500/750/resize/6/t/6ts24w001-sn014-thumb.webp',
            name: 'Áo phông nữ',
            total: 249000
        },
        {
            id: 2,
            image: 'https://canifa.com/img/500/750/resize/6/i/6it24w004-sa191-l-1-u.webp',
            name: 'Áo body nữ cổ lửng',
            total: 279000
        },
        {
            id: 3,
            image: 'https://canifa.com/img/500/750/resize/6/i/6it24w003-se136-thumb.webp',
            name: 'Áo body nữ cổ tròn',
            total: 279000
        },
        {
            id: 4,
            image: 'https://canifa.com/img/500/750/resize/6/t/6tl24w006-sb508-m-1-u.webp',
            name: 'Áo phông dài tay nữ',
            total: 249000

        },
        {
            id: 5,
            image: 'https://canifa.com/img/500/750/resize/6/t/6ts24w001-sn014-thumb.webp',
            name: 'Áo phông nữ',
            total: 249000
        },
    ]

    const nuData = [
        {
            id: 1,
            image: 'https://canifa.com/img/500/750/resize/6/i/6it24w004-sa191-l-1-u.webp',
            name: 'Áo phông nữ',
            total: 249000
        },
        {
            id: 2,
            image: 'https://canifa.com/img/500/750/resize/6/i/6it24w004-sa191-l-1-u.webp',
            name: 'Áo body nữ cổ lửng',
            total: 279000
        },
        {
            id: 3,
            image: 'https://canifa.com/img/500/750/resize/6/i/6it24w004-sa191-l-1-u.webp',
            name: 'Áo body nữ cổ tròn',
            total: 279000
        },
        {
            id: 4,
            image: 'https://canifa.com/img/500/750/resize/6/t/6tl24w006-sb508-m-1-u.webp',
            name: 'Áo phông dài tay nữ',
            total: 249000

        },
        {
            id: 5,
            image: 'https://canifa.com/img/500/750/resize/6/t/6tl24w006-sb508-m-1-u.webp',
            name: 'Áo phông nữ',
            total: 249000
        },
    ]

    const betraiData = [
        {
            id: 6,
            image: 'https://canifa.com/img/500/750/resize/6/i/6it24w004-sa191-l-1-u.webp',
            name: 'Áo phông nữ',
            total: 249000
        },
    ]

    const begaiData = [
        {
            id: 7,
            image: 'https://canifa.com/img/500/750/resize/6/i/6it24w004-sa191-l-1-u.webp',
            name: 'Áo phông nữ hihi',
            total: 249000
        },
    ]

    const namData = [
        {
            id: 8,
            image: 'https://canifa.com/img/1517/2000/resize/8/b/8bj24w004-sj890-31-1-u.webp',
            name: 'Quần jeans nam phom relaxed',
            total: 499000
        },
    ]


    const [data, setData] = useState(alltData);

    const [activeId, setActiveId] = useState(0);
    const onClickNavbar = async (objectId) => {
        setActiveId(objectId);
        switch (objectId) {
            case 0:
                setData(alltData);
                break;
            case 1:
                setData(betraiData);
                break;
            case 2:
                setData(begaiData);
                break;
            case 3:
                setData(namData);
                break;
            case 4:
                setData(nuData);
                break;
            default:
                setData(alltData);
        }
    }
    return (
        <>
            <div className='navbar'>
                {[0, 1, 2, 3, 4].map(id => (
                    <div
                        key={id}
                        className={`nav_list ${activeId === id ? 'active' : ''}`}
                        onClick={() => onClickNavbar(id)}>
                        <p>{['TẤT CẢ', 'BÉ TRAI', 'BÉ GÁI', 'NAM', 'NỮ',][id]}</p>
                    </div>
                ))}
            </div>
            <div className='product-list'>
                {data.map((item) => (
                    <ProductCard
                        key={item.id} id={item.id} image={item.image} name={item.name} total={item.total}
                    />
                ))}
            </div>
        </>
    );
};

export default ProductList;