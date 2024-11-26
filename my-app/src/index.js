import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './page/user/homePage';
import RouterUserX from './router';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>

        <RouterUserX />

    </BrowserRouter>
);


