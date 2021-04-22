import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getUserId } from "../../store/user/select";

const ProtectedRoute = ({ isLoggedIn, accountType, location, ...rest }) => {
  if (!isLoggedIn) {
    return <Route {...rest} />;
  }

  if (useSelector(getUserId) !== "") {
    if (accountType) {
      if (accountType.indexOf(useSelector(getAccountType)) !== -1) {
        return <Route {...rest} />;
      }
    } else {
      return <Route {...rest} />;
    }
  }

  return (
    <Redirect
      to={{
        pathname: "/admin/auth/login",
        state: {
          from: location,
        },
      }}
    />
  );
};

export default ProtectedRoute;
