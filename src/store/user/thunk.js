import jwtDecode from "jwt-decode";
import _ from "lodash";
import api, { registerAccessToken } from "./../../api";
import {
  setProfileData,
  setTokenData,
  setUserData,
  updateProfileData,
} from "./index";

export default class userThunk {
  
  // static userLogin(email, password) {
  //   return async (dispatch, getState) => {
  //     const [res, data] = await api.user.login.user(email, password);
  //     if (res.status === 200) {
  //       dispatch(setUserData(data.data));
  //       dispatch(setTokenData(data.token));
  //     }
  //     return res;
  //   };
  // }

  static adminLogin(username, password) {
    return async (dispatch, getState) => {
      const [res, data] = await api.user.login.admin(email, password);
      if (res.status === 200) {
        dispatch(setUserData(data.data));
        dispatch(setTokenData(data.token));
      }
      return res;
    };
  }

  static checkToken() {
    return (dispatch, getState) => {
      const accessToken = localStorage.getItem("pv-access-token");
      if (!accessToken) return;
      const payload = jwtDecode(accessToken);
      if (!payload) return;

      dispatch(
        setUserData(
          _.pick(payload, [
            "userId",
            "name",
            "userType",
            "mobile"
          ])
        )
      );

      const refreshToken = localStorage.getItem("pv-refresh-token");
      if (!refreshToken) {
        refreshToken = "";
      }

      dispatch(
        setTokenData({
          access: accessToken,
          refresh: refreshToken,
        })
      );
    };
  }

  static getProfileDetails() {
    return async (dispatch, getState) => {
      if (Object.keys(getState().user.profileData).length === 0) {
        registerAccessToken(getState().user.tokens.access);
        const [res, data] = await api.user.get.adminProfile();
        if (res.status === 200) {
          dispatch(setProfileData(data));
        }
        return res;
      } else {
        return { status: 200 };
      }
    };
  }

  static updateProfileDetails(profileData) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.user.put.updateSenderProfile(profileData);
      if (res.status === 200) {
        dispatch(updateProfileData(profileData));
      }
      return res;
    };
  }

  static changePassword(passwordData) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.user.put.changePassword(passwordData);
      return res;
    };
  }
}
