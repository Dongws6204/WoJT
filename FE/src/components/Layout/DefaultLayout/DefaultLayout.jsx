import React from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Banner from '../../Banner/Banner';

const DefaultLayout = ( { children } ) => {
    return (
        <div>
            <Header/>
            <Banner/>
            <div>
                { children }
            </div>
            <Footer/>
        </div>
    );
};

export default DefaultLayout;