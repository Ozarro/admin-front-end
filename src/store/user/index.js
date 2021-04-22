import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  userData: {
    userId: "",
    name: "",
    mobile: "",
    userType: ""
  },
  profileData: {
    userId: "",
    name: "",
    mobile: "",
    userType: "",
    image : ""
  },
  tokens: {
    access: "",
    refresh: "",
  },
  profileData: {},
  bankData: {},
};

/**
 * User Slice
 */
const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },

    setTokenData(state, action) {
      state.tokens = action.payload;
    },

    setProfileData(state, action) {
      state.profileData = action.payload;
    },

    updateProfileData(state, action) {
      state.profileData.name = action.payload.name;
      state.profileData.mobile = action.payload.mobile;
    }
  },
});

/**
 * Exports
 */
export const {
  setUserData,
  setTokenData,
  setProfileData,
  updateProfileData
} = userSlice.actions;

export default userSlice.reducer;
