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
 * Product Management Component
 */
const CreateProduct = React.lazy(() =>
    import("./views/product/addProduct"));
const ProductTable = React.lazy(() =>
    import("./views/product/productTable"));
const ProductView = React.lazy(() =>
    import("./views/product/productView"));

/**
 * User Management Components
 *
 */
const AdminTable = React.lazy(() =>
    import("./views/user/admin/adminTable"));
const AdminView = React.lazy(() =>
    import("./views/user/admin/adminView"));



const routes = [
  { path: "/admin/", exact: true, name: "Home" },
  // {
  //   path: "/admin/dashboard",
  //   name: "Dashboard",
  //   component: Dashboard,
  // },
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
];

export default routes;
