import React, { Children } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import NavbarUser from '../../NavbarUser/NavbarUser';
import './userlayout.css'

const UserLayout = ({children}) => {
    return (
        <>
           <Header></Header> 
           <div className='layout-content'>
                <NavbarUser></NavbarUser>
                <div className='user_layout'>
                    {children}
                </div>
           </div>
           <Footer></Footer>
        </>
    );
};

export default UserLayout;