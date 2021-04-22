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
    _children: ["Order Managment"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Create New Order",
    to: "/admin/order/new",
    icon: "cil-truck",
    accountType: ["Normal Sender", "Business Sender"],
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Finance"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Payment Summary",
    to: "/admin/payment/summary",
    icon: "cil-balance-scale",
    accountType: ["Normal Sender", "Business Sender"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Credit Facility",
    to: "/admin/credit",
    icon: "cil-money",
    accountType: ["Business Sender"],
  },
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Issue"],
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Create New Issue",
  //   to: "/admin/issue/new",
  //   icon: "cil-bullhorn",
  //   accountType: ["Normal Sender", "Business Sender"],
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "View Issue",
  //   to: "/admin/issue",
  //   icon: "cil-spreadsheet",
  //   accountType: ["Normal Sender", "Business Sender"],
  // },
];

export default _nav;
