import { memo, useState } from "react";
import Header from "../header"
import Footer from "../footer";
import './body.css'



const Body = ({ children, ...props }) => {
    return (
        <div className="body-container" {...props}>
            <Header />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};


export default memo(Body);