export const ROUTERS = {
    USER: {
        HOME: "",
        LOGOUT: "",
        PROFILE: "profile",
        REGISTER: "register",
        CART: "cart",
        WISHLIST: "wislist",//DANH SACH YEU THICH
        ODERD_HISTORY: "oderd_history",//LICH SU DON HANG
        PRODUCT_DETAIL: "product",//SAN PHAM
        CATEGORY: "category",//
        CHECKOUT: "checkout",//Trang thanh toan
    },
    ADMIN: {
        DASHBOARD: "admin/dashboard", // Trang quản trị tổng quan
        USERS: "admin/users", // Quản lý người dùng
        PRODUCTS: "admin/products", // Quản lý sản phẩm
        ORDERS: "admin/orders", // Quản lý đơn hàng
        ADD_PRODUCT: "admin/product/add", // Thêm sản phẩm
        EDIT_PRODUCT: "admin/product/edit/:id", // Sửa thông tin sản phẩm (dùng tham số id)
        CATEGORIES: "admin/categories", // Quản lý danh mục sản phẩm
        REPORTS: "admin/reports", // Báo cáo doanh thu, thống kê
    },

    GUEST: {
        PAGE: "",
        LOGIN: "login",
        REGISTER: "register",
        FORGOTPASSWORD: "forgot-password",

    }
};

