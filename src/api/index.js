import axios from "axios";

/**
 * Setup Axios
 */
//const BASE_URL_HEROKU = "https://pickvick-api-dev.herokuapp.com/api";
// const BASE_URL_HEROKU = "https://pick-vick-back-end.herokuapp.com/api";
const BASE_URL_LOCAL = "http://localhost:8000/api";
axios.defaults.baseURL = BASE_URL_LOCAL;

/**
 * Register Access token with axios
 * @param token
 */
export const registerAccessToken = (token) => {
  axios.defaults.headers["authorization"] = `Bearer ${token}`;
};

/**
 * Convert Axios Response into
 *      status: http status code
 *      message: message from backend api
 * @param res
 */
function readStatus(res) {
  if (!res || !res.status) {
    return {
      status: 408,
      message: "Check your internet connection",
    };
  }
  return {
    status: res.status,
    message: res.data.message,
  };
}

/**
 * Resolve Axios Response
 * @param axiosRes
 * @param options
 */
async function ajaxResolver(axiosRes, options = null) {
  try {
    const res = await axiosRes;
    console.log("this is reponse", res);
    if (options && options.fullBody) return [readStatus(res), res.data];
    else return [readStatus(res), res.data.data];
  } catch (e) {
    const res = e.response;
    console.log("this is error", e);
    return [readStatus(res), null];
  }
}

export default {
  user: {
    login: {
      async user(username, password) {
        return ajaxResolver(
          axios.post("/user/login", { username, password }),
          { fullBody: true }
        );
      },
      async admin(email, password) {
        return ajaxResolver(
          axios.post("/user/login/admin", { email, password }),
          { fullBody: true }
        );
      },
    },

    add: {
      async user(data) {
        return ajaxResolver(axios.post("/api/user/create/user", data));
      },
      async admin(data) {
        console.log(data);
        return ajaxResolver(axios.post("/user/register/admin", data));
      },
    },

    get: {
      async users(query) {
        return ajaxResolver(axios.get("/api/user/get-all", { params: query }));
      },
      async admins(query) {
        return ajaxResolver(
          axios.get("/api/user/get-all/admin", { params: query })
        );
      },
      async getAdminProfile() {
        return ajaxResolver(axios.get("/api/user/get-profile"));
      }
    },
    put: {
      async changeStatus(userId, status) {
        return ajaxResolver(
          axios.put(`/api/user/change-status/${userId}`, { status })
        );
      },
      async changePassword(data) {
        return ajaxResolver(axios.put(`/api/user/change-password`, data));
      },
      async updateSenderProfile(profileData) {
        return ajaxResolver(
          axios.put(`/api/user/update-sender-profile`, profileData)
        );
      },
      async updatePaymentMethod(paymentMethod) {
        return ajaxResolver(
          axios.put(`/api/user/update-payment-method`, paymentMethod)
        );
      },
      async updateBankDetails(bankData) {
        return ajaxResolver(
          axios.put(`/api/user/update-bank-details`, bankData)
        );
      },
    },
    remove: {
      async bankDetails(accountNumber) {
        return ajaxResolver(
          axios.delete(
            `/api/user/remove-bank-details/${accountNumber}?accountNumber=${accountNumber}`
          )
        );
      },
    },
  },
  order: {
    create: {
      async sender(data) {
        return ajaxResolver(axios.post(`/api/order/place-order`, data));
      },
      async guest(data) {
        return ajaxResolver(axios.post(`/api/order/guest-place-order`, data));
      },
    },
    get: {
      async personal(query) {
        return ajaxResolver(axios.get(`/api/order/get-my-all`, query));
      },
      async all(query) {
        return ajaxResolver(axios.get(`/api/order/get-all`, query));
      },
      async orderInfo(orderId) {
        return ajaxResolver(axios.get(`/api/order/get-order/${orderId}`));
      },
      async trackOrder(trackingId) {
        return ajaxResolver(axios.get(`/api/order/track-order/${trackingId}`));
      },
      async count() {
        return ajaxResolver(axios.get(`/api/order/get-sender-orderCounts`));
      },
    },
  },
  finance: {
    get: {
      async personal(query) {
        return ajaxResolver(axios.get(`/api/finance/get-my-full`, query));
      },
      async amount() {
        return ajaxResolver(axios.get(`/api/finance/get-sender-myCounts`));
      },
      async creditDetails() {
        return ajaxResolver(axios.get(`/api/user/get-credits`));
      },
      async payments() {
        return ajaxResolver(axios.get(`/api/finance/get-my-all`));
      },
    },
  },
  issue: {
    get: {
      async senderIssues() {
        return ajaxResolver(axios.get(`/api/issue/get-my-all`));
      },
    },
    post: {
      async createIssue(data) {
        return ajaxResolver(axios.post(`/api/issue/create`, data));
      },
    },
  },
  metaData: {
    get: {
      async paymentStatus() {
        return ajaxResolver(axios.get(`/api/meta/get-PaymentStatus`));
      },
      async orderStatus() {
        return ajaxResolver(axios.get(`/api/meta/get-OrderStatus`));
      },
    },
  },
};
