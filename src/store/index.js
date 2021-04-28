import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import uiReducer from "./ui";

import userReducer, {
  setProfileData,
  setTokenData,
  setUserData,
  updateProfileData,
    setAdmins
} from "./user";

import productReducer , {
  setCategories,
  setProducts
} from "./product";

/**
 * Thunk Actions
 */
import userThunk from "./user/thunk";
import productThunk from "./product/thunk";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    product : productReducer,
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
    updateProfileData,
    setAdmins
  },
  product : {
    setCategories,
    setProducts
  },
};

export const thunks = {
  user: userThunk,
  product : productThunk,
};


/**
 * Helper Function
 */
export function cleanQuery(query , fields = null) {
  const qClone = {...query}
  Object.keys(qClone).forEach(
      (k) => {
        if (fields === null || fields.includes(k) ) {
          (qClone[k] === null || qClone[k] === undefined) && delete qClone[k]
        } else {
          delete qClone[k]
        }

      }
  )

  return qClone
}

