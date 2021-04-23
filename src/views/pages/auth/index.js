import React from "react";
import { Route, Switch , Redirect} from "react-router-dom";
import "../../../assets/scss/style.scss";
import Login from "./login";
import Register from "./register";

const Auth = (props) => {
  return (
    <>
      <Switch>
      
        <Route
          path="/admin/auth/login"
          name="Login Page"
          render={(props) => <Login {...props} />}
        />
        <Route
          path="/admin/auth/register"
          name="Register Page"
          render={(props) => <Register {...props} />}
        />
        <Redirect from="/admin/auth" to="/admin/auth/login" />
      </Switch>
    </>
  );
};

export default Auth;
