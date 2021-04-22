import { setInDetailOrder, setOrderCount, setOrders, setOrderStatus } from ".";
import api, { registerAccessToken } from "./../../api";

export default class userThunk {
  static getAllOrders() {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.order.get.personal();
      if (res.status === 200) {
        const orders = data.filter((order) => {
          const [date, val] = order.createdAt.split("T");
          const [time, x] = val.split(".");
          order.createdDate = date;
          order.createdTime = time;
          return order;
        });
        dispatch(setOrders(orders));
      }
      return res;
    };
  }

  static newSenderOrder(orderData) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.order.create.sender(orderData);
      return res;
    };
  }

  static newGuestOrder(orderData) {
    return async (dispatch, getState) => {
      const [res, data] = await api.order.create.guest(orderData);
      return [res, data];
    };
  }

  static getOrderDetailsById(orderId) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.order.get.orderInfo(orderId);
      if (res.status === 200) {
        dispatch(setInDetailOrder(data));
      }
      return res;
    };
  }

  static trackOrderDetailsById(trackingId) {
    return async (dispatch, getState) => {
      const [res, data] = await api.order.get.trackOrder(trackingId);
      if (res.status === 200) {
        dispatch(setInDetailOrder(data[0]));
      }
      return res;
    };
  }

  static getOrderCounts() {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.order.get.count();
      if (res.status === 200) {
        dispatch(setOrderCount(data));
      }
      return res;
    };
  }

  static getAllStatus() {
    return async (dispatch, getState) => {
      if (getState().order.status.length === 0) {
        const [res, data] = await api.metaData.get.orderStatus();
        if (res.status === 200) {
          dispatch(setOrderStatus(data));
        }
        return res;
      }
    };
  }
}
