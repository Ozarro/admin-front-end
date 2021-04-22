import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard"));
const CreateSenderOrder = React.lazy(() =>
  import("./views/order/sender/createOrderForm")
);

const SenderOrderDetails = React.lazy(() =>
  import("./views/order/sender/viewOrderForm")
);
const SenderProfile = React.lazy(() =>
  import("./views/accountSettings/senderProfile")
);
const SenderProfileEdit = React.lazy(() =>
  import("./views/accountSettings/senderProfileEdit")
);
const ChangePassword = React.lazy(() =>
  import("./views/accountSettings/changePassword")
);

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
    component: SenderProfileEdit,
  },
  {
    path: "/admin/profile",
    name: "Profile",
    component: SenderProfile,
  },
  {
    path: "/admin/change-password",
    name: "Change Password",
    component: ChangePassword,
  },
];

export default routes;
