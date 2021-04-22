import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import financeReducer, {
  setAmount,
  setPayments,
  setPaymentStatus,
  setCredit,
} from "./finance";
import financeThunk from "./finance/thunk";

import issueReducer, { setIssues } from "./issue";
import issueThunk from "./issue/thunk";

import orderReducer, {
  setInDetailOrder,
  setOrderCount,
  setOrders,
  setOrderStatus,
} from "./order";
import orderThunk from "./order/thunk";

import uiReducer from "./ui";

import userReducer, {
  setBankData,
  setProfileData,
  setTokenData,
  setUserData,
  unsetBankData,
  updatePaymentMethod,
  updateProfileData,
} from "./user";

/**
 * Thunk Actions
 */
import userThunk from "./user/thunk";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    order: orderReducer,
    issue: issueReducer,
    finance: financeReducer,
  },
  middleware: getDefaultMiddleware({
    thunk: true,
    immutableCheck: true,
    serializableCheck: true,
  }),
});

/**
 * Store
 */
export default store;

export const actions = {
  user: {
    setUserData,
    setTokenData,
    setProfileData,
    updateProfileData
  },
  order: { setOrders, setInDetailOrder, setOrderCount, setOrderStatus },
  issue: { setIssues },
  finance: { setAmount, setPaymentStatus, setPayments, setCredit },
};

export const thunks = {
  user: userThunk,
  order: orderThunk,
  issue: issueThunk,
  finance: financeThunk,
};
