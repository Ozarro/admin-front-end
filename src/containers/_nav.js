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
  {
    _tag: "CSidebarNavTitle",
    _children: ["Product Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Product",
    to: "/admin/product/add-product",
    icon: "cil-bookmark",
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Products",
    to: "/admin/product/view-products",
    icon: "cil-spreadsheet",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Category",
    to: "/admin/product/add-category",
    icon: "cil-bookmark",
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Categories",
    to: "/admin/product/view-categories",
    icon: "cil-spreadsheet",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Coupon Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Coupon",
    to: "/admin/coupon/add-coupon",
    icon: "cil-bookmark",
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Coupons",
    to: "/admin/coupon/view-coupons",
    icon: "cil-spreadsheet",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Order Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Orders",
    to: "/admin/order/view-orders",
    icon: "cil-spreadsheet",
  },
];

export default _nav;
