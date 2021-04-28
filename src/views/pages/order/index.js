import React from "react";
import { Route, Switch } from "react-router-dom";
import "../../../assets/scss/style.scss";

const Order = (props) => {
  return (
    <>
      <Switch>
        <Route
          path="/order/guest"
          name="Guest Order Page"
          // render={(props) => <GuestOrderCreateForm {...props} />}
        />
        <Route
          path="/order/tracking/:trackingId"
          name="Tracking Page"
          // render={(props) => <GuestOrderDetails {...props} />}
        />
      </Switch>
    </>
  );
};

export default Order;
