import React from "react";
import { Route, Switch } from "react-router-dom";
import GuestOrderCreateForm from "../../../../src/views/order/guest/createOrderForm";
//import TrackingOrder from "../../../../src/views/order/guest/trackingOrder";
import GuestOrderDetails from "../../../../src/views/order/guest/viewOrderForm";
import "../../../assets/scss/style.scss";

const Order = (props) => {
  return (
    <>
      <Switch>
        <Route
          path="/order/guest"
          name="Guest Order Page"
          render={(props) => <GuestOrderCreateForm {...props} />}
        />
        <Route
          path="/order/tracking/:trackingId"
          name="Tracking Page"
          render={(props) => <GuestOrderDetails {...props} />}
        />
        {/* <Route
          path="/order/test-tracking"
          name="Tracking Page"
          render={(props) => <TrackingOrder {...props} />}
        /> */}
      </Switch>
    </>
  );
};

export default Order;
