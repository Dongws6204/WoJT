import { Component, useState, createContext, useContext, useEffect } from "react";
import { ROUTERS } from "./utils/router";
import HomePage from "./page/user/homePage";
import PageGuest from "./page/user/homePage";
import ProfilePage from "./page/user/profilePage";
import Login from "./page/user/login";
import ForgotPassword from "./page/user/fogotPassword";
import Register from "./page/user/register";
import Body from "./page/user/layout/body";
import Guest from "./page/user/layout/guest";
import { Route, Routes } from 'react-router-dom'
import Header from "./page/user/layout/header";


export const ContextCheckLogin = createContext();

const renderUserRouter = (checkLogin) => {
    const guestRouters = [
        {
            path: ROUTERS.GUEST.LOGIN,
            component: <Login />
        },
        {
            path: ROUTERS.GUEST.FORGOTPASSWORD,
            component: <ForgotPassword />
        },
        {
            path: ROUTERS.GUEST.REGISTER,
            component: <Register />
        },
        {
            path: ROUTERS.GUEST.PAGE,
            component: <HomePage />,
        }
    ];

    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage />,
        },
        {
            path: ROUTERS.USER.PROFILE,
            component: <ProfilePage />,
        },

    ];

    return (
        <Routes>
            {checkLogin
                ? userRouters.map((item, key) => (
                    <Route
                        key={key}
                        path={item.path}
                        element={item.component}
                    />
                ))
                : guestRouters.map((item, key) => (
                    <Route
                        key={key}
                        path={item.path}
                        element={item.component}
                    />
                ))
            }
        </Routes>
    );
};

const RouterUserX = () => {
    const [checkLogin, setCheckLogin] = useState(false);
    const [role, setRole] = useState('guest');
    useEffect(() => {
        if (role === 'guest') {
            setCheckLogin(false);
        }
    }, [role]);
    return (
        <ContextCheckLogin.Provider value={{ checkLogin, setCheckLogin, role, setRole }}>
            {checkLogin ? <Body>{renderUserRouter(checkLogin)}</Body> : <Guest> {renderUserRouter(checkLogin)}</Guest>}
        </ContextCheckLogin.Provider>
    );
};

export default RouterUserX;