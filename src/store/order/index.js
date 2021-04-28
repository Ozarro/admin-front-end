import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  orders : [],
  coupons : [],
  orderCounts : []
};

/**
 * Product Slice
 */
const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },

    setCoupons(state, action) {
      state.coupons = action.payload;
    },

    setOrderCounts(state, action){
      state.orderCounts = action.payload
    }

  },
});

/**
 * Exports
 */
export const {
  setOrders,
  setCoupons,
    setOrderCounts
} = orderSlice.actions;

export default orderSlice.reducer;
