import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  inDetailOrder: {},
  count: [],
  status: [],
};

/**
 * Order Slice
 */
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setInDetailOrder(state, action) {
      state.inDetailOrder = action.payload;
    },
    setOrderCount(state, action) {
      state.count = action.payload;
    },
    setOrderStatus(state, action) {
      state.status = action.payload;
    },
  },
});

/**
 * Exports
 */
export const {
  setOrders,
  setInDetailOrder,
  setOrderCount,
  setOrderStatus,
} = orderSlice.actions;
export default orderSlice.reducer;
