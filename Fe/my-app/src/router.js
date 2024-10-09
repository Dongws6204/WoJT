import { Component } from "react";
import { ROUTERS } from "./utils/router";
import HomePage from "./page/user/homePage";
import ProfilePage from "./page/user/profilePage";
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