import HomePage from '../pages/Home/HomePage';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import ForgetPassword from '../components/ForgetPassword/ForgetPassword';
import Profile from '../pages/Profile/Profile';
import HeaFootOnly from '../components/Layout/HeaFootOnly/HeaFootOnly';
import UserLayout from '../components/Layout/UserLayout/UserLayout';
import Cart from '../pages/Products/Cart/Cart'
import ListPortfolio from '../pages/Products/ListPortFolio/ListPortfolio';
import ProductDetail from '../pages/Products/ProductDetail/ProductDetail';
import Search from '../pages/Products/Search/Search';
import ChangePassword from '../pages/Profile/ChangePassword/ChangePassword';
import User_order from '../pages/Profile/UserOrder/User_order';
import UserAddress from '../pages/Profile/UserAddress/UserAddress';
import Size from '../pages/About/Size/Size';

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
    {path: '/products/:object_name/:port_name', component: ListPortfolio, layout: HeaFootOnly},
    {path: '/search/:searchContent', component: Search, layout: HeaFootOnly},
    {path: '/profile/dia_chi_giao_hang' , component: UserAddress, layout: UserLayout},
    {path: '/bang_size', component: Size, layout: HeaFootOnly},
]

export {router};