import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const selectAllOrders = createDraftSafeSelector(
  (state) => state.order,
  (order) => order.orders
);

export const selectInDetailOrder = createDraftSafeSelector(
  (state) => state.order,
  (order) => order.inDetailOrder
);

export const selectOrderCount = createDraftSafeSelector(
  (state) => state.order,
  (order) => order.count
);

export const selectOrderStatus = createDraftSafeSelector(
  (state) => state.order,
  (order) => order.status
);
