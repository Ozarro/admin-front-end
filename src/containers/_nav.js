import CIcon from "@coreui/icons-react";
import React from "react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["User Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "View All Admins",
    to: "/admin/view-admins",
    icon: "cil-user",
    // accountType: ["Admin"],
  },
];

export default _nav;
