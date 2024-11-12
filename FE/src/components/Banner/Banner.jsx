import React from 'react';
import { useState, useEffect } from 'react';
import './Banner.css';

const Banner = () => {
    const images = [
        'https://media.canifa.com/Simiconnector/BannerSlider/s/p/spmoi_topbanner_desktop-17oct.webp',
        'https://media.canifa.com/Simiconnector/Ni_blockhomepage_desktop-04Oct.webp',
        'https://media.canifa.com/Simiconnector/3.Jean_blockhomepage_desktop-30Sep.webp',
        'https://media.canifa.com/Simiconnector/2.AoPhong_blockhomepage_desktop-30Sep-a.webp',
        'https://media.canifa.com/Simiconnector/4.AoGio_blockhomepage_desktop-30Sep.webp'
    ]; 

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3600); // Thay đổi hình ảnh sau mỗi 3 giây

        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <div className="banner">
            <img
                src={images[currentImageIndex]}
                className="banner-image"/>
        </div>
    );
};

export default Banner;
