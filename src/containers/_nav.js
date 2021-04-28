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
    accountType: ["Admin"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "View All Admins",
    to: "/admin/view-admins",
    icon: "cil-user",
    accountType: ["Admin"],
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Product Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Product",
    to: "/admin/product/add-product",
    icon: "cib-product-hunt",

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
    to: "/admin/category/add-category",
    icon: "cil-library-add",
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Categories",
    to: "/admin/category/view-categories",
    icon: "cil-library",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Coupon Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Coupon",
    to: "/admin/coupon/add-coupon",
    icon: "cil-credit-card",
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Coupons",
    to: "/admin/coupon/view-coupons",
    icon: "cil-money",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Order Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Orders",
    to: "/admin/order/view-orders",
    icon: "cil-cart",
  },
];

export default _nav;
