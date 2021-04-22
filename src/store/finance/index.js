import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: {},
  paymentStatus: [],
  payments: [],
  credit: {},
};

/**
 * Issue Slice
 */
const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setAmount(state, action) {
      state.amount = action.payload;
    },
    setPaymentStatus(state, action) {
      state.paymentStatus = action.payload;
    },
    setPayments(state, action) {
      state.payments = action.payload;
    },
    setCredit(state, action) {
      state.credit = action.payload;
    },
  },
});

/**
 * Exports
 */
export const {
  setAmount,
  setPaymentStatus,
  setPayments,
  setCredit,
} = financeSlice.actions;
export default financeSlice.reducer;
