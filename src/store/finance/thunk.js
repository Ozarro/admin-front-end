import { setAmount, setCredit, setPayments, setPaymentStatus } from ".";
import api, { registerAccessToken } from "./../../api";

export default class userThunk {
  static getAmount() {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.finance.get.amount();
      if (res.status === 200) {
        dispatch(setAmount(data));
      }
      return res;
    };
  }

  static getCreditDetails() {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.finance.get.creditDetails();
      if (res.status === 200) {
        dispatch(setCredit(data));
      }
      return res;
    };
  }

  static getPaymentStatus() {
    return async (dispatch, getState) => {
      if (getState().finance.paymentStatus.length === 0) {
        registerAccessToken(getState().user.tokens.access);
        const [res, data] = await api.metaData.get.paymentStatus();
        if (res.status === 200) {
          dispatch(setPaymentStatus(data));
        }
        return res;
      }
    };
  }

  static getAllPayments() {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.finance.get.payments();
      if (res.status === 200) {
        dispatch(setPayments(data));
      }
      return res;
    };
  }

  static newSenderIssue(issueData) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.issue.post.createIssue(issueData);
      return res;
    };
  }
}
