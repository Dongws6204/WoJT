import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useLocation } from 'react-router-dom';

const ProductSuggestion = () => {
  const [listSuggest, setListSuggest] = useState([]);
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(4);
  const discounts = 30;
  const location = useLocation();
  const product_Id = location.state?.id;

  const suggestionData = [
    {
      "product_id": 25,
      "img": "https://canifa.com/img/500/750/resize/8/t/8ts25a002-se409-xl-1-u.webp",
      "product_name": "Áo phông nam",
      "price": "149000.00"
    },
    {
      "product_id": 27,
      "img": "https://canifa.com/img/500/750/resize/8/t/8tl24w005-sa815-xl-1-u.webp",
      "product_name": "Áo phông active nam",
      "price": "399000.00"
    },
    {
      "product_id": 28,
      "img": "https://canifa.com/img/500/750/resize/8/t/8ts24w004-se331-xl-1-u.webp",
      "product_name": "Áo phông nam",
      "price": "449000.00"
    },
    {
      "product_id": 33,
      "img": "https://2885371169.e.cdneverest.net/pub/media/catalog/product/8/t/8ts25s016-sg305-l-1-u.webp",
      "product_name": "Áo phông nam cổ tròn dáng suông",
      "price": "149000.00"
    },
    {
      "product_id": 34,
      "img": "https://2885371169.e.cdneverest.net/pub/media/catalog/product/8/t/8ts25s016-sg305-l-1-u.webp",
      "product_name": "Áo phông nam cổ tròn dáng suông",
      "price": "149000.00"
    },
  ];

  useEffect(() => {
    setListSuggest(suggestionData.slice(0, 4));
  }, []);

  const handleNext = () => {
    if (rightCount < suggestionData.length) {
      const newLeft = leftCount + 2;
      const newRight = rightCount + 2;
      setLeftCount(newLeft);
      setRightCount(newRight);
      setListSuggest(suggestionData.slice(newLeft, newRight));
    }
  };

  const handlePrev = () => {
    if (leftCount > 0) {
      const newLeft = leftCount - 2;
      const newRight = rightCount - 2;
      setLeftCount(newLeft);
      setRightCount(newRight);
      setListSuggest(suggestionData.slice(newLeft, newRight));
    }
  };

  return (
    <div className='viewed-btn'>
      <button onClick={handlePrev} disabled={leftCount <= 0}>
        <IoIosArrowBack />
      </button>

      <div className='viewed-product'>
        {listSuggest.map((item) => (
          <ProductCard
            key={item.product_id}
            id={item.product_id}
            image={item.img}
            name={item.product_name}
            total={item.price}
            discount={discounts}
          />
        ))}
      </div>

      <button onClick={handleNext} disabled={rightCount >= suggestionData.length}>
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default ProductSuggestion;
