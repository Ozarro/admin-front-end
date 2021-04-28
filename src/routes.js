import React from "react";

// const Dashboard = React.lazy(() => import("./views/dashboard"));


/**
 * Profile Components
 * @type {React.LazyExoticComponent<React.ComponentType<any>>}
 */
const AdminProfile = React.lazy(() =>
  import("./views/accountSettings/profile")
);
const AdminProfileEdit = React.lazy(() =>
  import("./views/accountSettings/profileEdit")
);
const ChangePassword = React.lazy(() =>
  import("./views/accountSettings/changePassword")
);

/**
 * User Management Components
 *
 */
const AdminTable = React.lazy(() =>
    import("./views/user/admin/adminTable"));
const AdminView = React.lazy(() =>
    import("./views/user/admin/adminView"));

/**
 * Product Management Component
 */
const CreateProduct = React.lazy(() =>
    import("./views/product/addProduct"));
const ProductTable = React.lazy(() =>
    import("./views/product/productTable"));
const ProductView = React.lazy(() =>
    import("./views/product/productView"));


/**
 * Category Management Component
 */
const CreateCategory = React.lazy(() =>
    import("./views/category/addCategory"));
const CategoryTable = React.lazy(() =>
    import("./views/category/categoryTable"));
const CategoryView = React.lazy(() =>
    import("./views/category/categoryView"));

/**
 * Coupon Management Component
 */
const CreateCoupon = React.lazy(() =>
    import("./views/coupon/addCoupon"));
const CouponTable = React.lazy(() =>
    import("./views/coupon/couponTable"));
const CouponView = React.lazy(() =>
    import("./views/coupon/couponView"));

/**
 * Order Management Component
 */
const OrderTable = React.lazy(() =>
    import("./views/order/orderTable"));
const OrderView = React.lazy(() =>
    import("./views/order/orderView"));

const Dashboard = React.lazy(() => import("./views/dashboard/index"))




const routes = [
  { path: "/admin/", exact: true, name: "Home" },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/admin/profile/edit",
    name: "Edit",
    component: AdminProfileEdit,
  },
  {
    path: "/admin/profile",
    name: "Profile",
    component: AdminProfile,
  },
  {
    path: "/admin/change-password",
    name: "Change Password",
    component: ChangePassword,
  },
  {
    path: "/admin/view-admins",
    name: "Admin Users",
    component: AdminTable,
  },
  {
    path: "/admin/view-admin/:userId",
    name: "Admin User",
    component: AdminView,
  },
  {
    path: "/admin/product/add-product",
    name: "Product",
    component: CreateProduct,
  },
  {
    path: "/admin/product/view-products",
    name: "Product",
    component: ProductTable,
  },
  {
    path: "/admin/product/update-product/:pCode",
    name: "Product",
    component: ProductView,
  },
  {
    path: "/admin/category/add-category",
    name: "Category",
    component: CreateCategory,
  },
  {
    path: "/admin/category/view-categories",
    name: "Category",
    component: CategoryTable,
  },
  {
    path: "/admin/category/update-category/:categoryId",
    name: "Category",
    component: CategoryView,
  },
  {
    path: "/admin/coupon/add-coupon",
    name: "Coupon",
    component: CreateCoupon,
  },
  {
    path: "/admin/coupon/view-coupons",
    name: "Coupon",
    component: CouponTable,
  },
  {
    path: "/admin/coupon/update-coupon/:couponId",
    name: "Category",
    component: CouponView,
  },
  {
    path: "/admin/order/view-orders",
    name: "Order",
    component: OrderTable,
  },
  {
    path: "/admin/order/update-order/:orderId",
    name: "Order",
    component: OrderView,
  },
];

export default routes;
