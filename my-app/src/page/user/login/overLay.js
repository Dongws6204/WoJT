import React from 'react';
import './Overlay.css'; // Import file CSS

const Overlay = ({ children }) => {
    return (
        <div className="overlay">
            <div className="overlay-content">
                {children}
            </div>
        </div>
    );
};

export default Overlay;
