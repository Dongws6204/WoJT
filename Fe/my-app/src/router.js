import { Component, useState, createContext, useContext } from "react";
import { ROUTERS } from "./utils/router";
import HomePage from "./page/user/homePage";
import ProfilePage from "./page/user/profilePage";
import Login from "./page/user/login";
import ForgotPassword from "./page/user/fogotPassword";
import Register from "./page/user/register";
import Body from "./page/user/layout/body";
import Guest from "./page/user/layout/guest";
import { Route, Routes } from 'react-router-dom'


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

    return (
        <ContextCheckLogin.Provider value={{ checkLogin, setCheckLogin }}>
            {checkLogin ? <Body>{renderUserRouter(checkLogin)}</Body> : <Guest>{renderUserRouter(checkLogin)}</Guest>}
        </ContextCheckLogin.Provider>
    );
};

export default RouterUserX;