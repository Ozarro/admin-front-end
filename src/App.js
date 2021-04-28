import React from "react";
import { useDispatch } from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { thunks } from "./store/index";

let path = require('path');
require('dotenv').config({path: path.join(__dirname,'../.env')});

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const Layout = React.lazy(() => import("./containers/Layout"));
const Auth = React.lazy(() => import("./views/pages/auth"));
const Order = React.lazy(() => import("./views/pages/order"));

function App() {
  const dispatch = useDispatch();
  dispatch(thunks.user.checkToken());

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <div>404 Component</div>}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={(props) => <div>500 Component</div>}
          />
          <Route
            path="/admin/auth"
            name="Auth Page"
            render={(props) => <Auth {...props} />}
          />

          {/* <Route
            path="/order"
            name="Order Page"
            render={(props) => <Order {...props} />}
          /> */}
          <ProtectedRoute
            isLoggedIn={true}
            path="/admin"
            name="Home"
            render={(props) => <Layout {...props} />}
          />
            <Redirect from="/" to="/admin" />
        </Switch>

      </React.Suspense>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
