import HomePage from '../pages/Home/HomePage';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import ForgetPassword from '../components/ForgetPassword/ForgetPassword';
import Profile from '../pages/Profile/Profile';
import HeaFootOnly from '../components/Layout/HeaFootOnly/HeaFootOnly';
import UserLayout from '../components/Layout/UserLayout/UserLayout';
import ProductDetail from '../pages/Products/ProductDetail';
import Cart from '../pages/Products/Cart'
import User_order from '../pages/Profile/User_order';
import ChangePassword from '../pages/Profile/ChangePassword';

const router = [
    {path: '/' , component: HomePage},
    {path: '/register' , component: Register, layout: null},
    {path: '/login' , component: Login, layout: null},
    {path: '/forget_pass' , component: ForgetPassword, layout: null},
    {path: '/profile/thong_tin_tai_khoan' , component: Profile, layout: UserLayout},
    {path: '/profile/don_hang' , component: User_order, layout: UserLayout},
    {path: '/profile/doi_mat_khau' , component: ChangePassword, layout: UserLayout},
    {path: '/product/:name' , component: ProductDetail, layout: HeaFootOnly},
    {path: '/cart', component: Cart, layout: HeaFootOnly},
]

export {router};