import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard"));
const CreateSenderOrder = React.lazy(() =>
  import("./views/order/sender/createOrderForm")
);

const SenderOrderDetails = React.lazy(() =>
  import("./views/order/sender/viewOrderForm")
);
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
];

export default routes;
