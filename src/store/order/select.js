import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const getAllOrders = createDraftSafeSelector(
    (state) => state.order,
    (order) => order.orders
);

export const getOrderCounts = createDraftSafeSelector(
    (state) => state.order,
    (order) => order.orderCounts
);

export const getAllCoupons = createDraftSafeSelector(
    (state) => state.order,
    (order) => order.coupons
);