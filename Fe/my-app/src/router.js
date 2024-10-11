import { Component, useState } from "react";
import { ROUTERS } from "./utils/router";
import HomePage from "./page/user/homePage";
import ProfilePage from "./page/user/profilePage";
import Login from "./page/user/login";
import ForgotPassword from "./page/user/fogotPassword";
import Register from "./page/user/register";
import Body from "./page/user/layout/body";
import { Route, Routes } from 'react-router-dom'
const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage />,
        },

        {
            path: ROUTERS.USER.PROFILE,
            component: <ProfilePage />,
        },

        {
            path: ROUTERS.GUEST.LOGIN,
            component: <Login />
        },
        {
            path: ROUTERS.USER.FORGOTPASSWORD,
            component: <ForgotPassword />
        },
        {
            path: ROUTERS.USER.REGISTER,
            component: <Register />
        }
    ]


    return (
        <Body>
            <Routes>
                {
                    userRouters.map((item, key) => (
                        <Route
                            key={key}
                            path={item.path}
                            element={item.component} // Kiểm tra nếu component tồn tại
                        />
                    )
                    )
                }
            </Routes>
        </Body>

    )
}


const RouterUserX = () => {
    return renderUserRouter();
};

export default RouterUserX;