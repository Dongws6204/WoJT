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
import AdminLayout from '../components/Layout/AdminLayout/AdminLayout';
import AdminDashboard from '../admin/dashboard/AdminDashboard';
import AdminUsers from '../admin/users/AdminUsers';
import AdminProduct from '../admin/products/AdminProduct';
import AdminPortfolio from '../admin/portfolio/AdminPortfolio';
import AdminSales from '../admin/sales/AdminSale';
import AdminOrder from '../admin/orders/AdminOrder';

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
    {path: '/admin', component: AdminDashboard, layout: AdminLayout},
    {path: '/admin/users', component: AdminUsers, layout: AdminLayout},
    {path: '/admin/products', component: AdminProduct, layout: AdminLayout},
    {path: '/admin/portfolio', component: AdminPortfolio, layout: AdminLayout},
    {path: '/admin/sales', component: AdminSales, layout: AdminLayout},
    {path: '/admin/orders', component: AdminOrder, layout: AdminLayout},
]

export {router};