import CIcon from "@coreui/icons-react";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CPopover,
  CRow,
  CWidgetProgressIcon,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { thunks } from "../../store/index";
import {getOrderCounts, getAllOrders} from "../../store/order/select";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const orderCounts = useSelector(getOrderCounts);
  const orders = useSelector(getAllOrders);
  const allOrderStatus = ["Processing", "Out of Delivery", "Delivered"];

  const [filterOrders, setFilterOrders] = useState([]);
  const [amountError, setAmountError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoverWidget, setHoverWidget] = useState("none");
  const [currentWidget, setCurrentWidget] = useState("all");

  useEffect(async () => {
    setLoading(true);
    let res = await dispatch(thunks.order.getOrderCounts());
    if (res.status !== 200) {
      setAmountError(true);
      toast.error(res.message);
    }

    res = await dispatch(thunks.order.getAllOrders());
    if (res.status !== 200) {
      toast.error(res.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (currentWidget === "all") {
      setFilterOrders(orders);
      return;
    }
    let status;
    if (currentWidget === "delivered") {
      status = ["Delivered"];
    } else if (currentWidget === "processing") {
      status = ["Processing"];
    } else {
      status = ["Out of Delivery"];
    }

    const data = orders.filter((item) => {
      return status.includes(item.orderStatus);
    });

    setFilterOrders(data);
  }, [currentWidget, orders]);

  useEffect(() => {
    return () => toast.dismiss();
    }, []);

  const makeOrderCounts = () => {
    const counts = {
      delivered: 0,
      outOfDelivery: 0,
      processing: 0,
    };
    orderCounts.map((item) => {
      if (item.orderStatus === "Processing")
        counts.processing = counts.processing + parseInt(item.count);
      if (item.orderStatus === "Out of Delivery")
        counts.outOfDelivery = counts.outOfDelivery + parseInt(item.count);
      if (item.orderStatus === "Delivered")
        counts.delivered = counts.delivered + parseInt(item.count);
    });
    return counts;
  };

  const orderCount = makeOrderCounts();


  const getBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Out of Delivery":
        return "warning";
      case "Processing":
        return "info";
      default:
        return "dark";
    }
  };


  const handleWidgetMouseOver = (name) => {
    setHoverWidget(name);
  };

  const handleWidgetMouseLeave = () => {
    setHoverWidget("none");
  };

  return (
    <React.Fragment>
      <CRow hidden={amountError} className="justify-content-center">
        <CCol sm="12" md="3">
          <CWidgetProgressIcon
            header={
              !loading
                ? `${
                    orderCount.delivered +
                    orderCount.processing +
                    orderCount.outOfDelivery 
                  }`
                : "loading..."
            }
            text="All Orders"
            color="gradient-info"
            inverse={currentWidget === "all" ? false : true}
            value={currentWidget === "all" || hoverWidget === "all" ? 100 : 0}
            style={{ cursor: "pointer" }}
            onMouseOver={() => handleWidgetMouseOver("all")}
            onMouseLeave={handleWidgetMouseLeave}
            onClick={(e) => {
              setCurrentWidget("all");
            }}
          >
            <CIcon name="cil-gift" height="36" />
          </CWidgetProgressIcon>
        </CCol>

        <CCol sm="12" md="3">
          <CWidgetProgressIcon
              header={!loading ? `${orderCount.processing}` : "loading..."}
              text="Processing"
              color="gradient-warning"
              inverse={currentWidget === "processing" ? false : true}
              value={
                currentWidget === "processing" || hoverWidget === "processing"
                    ? 100
                    : 0
              }
              style={{ cursor: "pointer" }}
              onMouseOver={() => handleWidgetMouseOver("processing")}
              onMouseLeave={handleWidgetMouseLeave}
              onClick={(e) => {
                setCurrentWidget("processing");
              }}
          >
            <CIcon name="cil-arrow-thick-from-right" height="36" />
          </CWidgetProgressIcon>
        </CCol>

        <CCol sm="12" md="3">

          <CWidgetProgressIcon
            header={!loading ? `${orderCount.delivered}` : "loading..."}
            text="Delivered Orders"
            color="gradient-success"
            inverse={currentWidget === "delivered" ? false : true}
            value={
              currentWidget === "delivered" || hoverWidget === "delivered"
                ? 100
                : 0
            }
            style={{ cursor: "pointer" }}
            onMouseOver={() => handleWidgetMouseOver("delivered")}
            onMouseLeave={handleWidgetMouseLeave}
            onClick={(e) => {
              setCurrentWidget("delivered");
            }}
          >
            <CIcon name="cil-truck" height="36" />
          </CWidgetProgressIcon>
        </CCol>

        <CCol sm="12" md="3">
          <CWidgetProgressIcon
            header={!loading ? `${orderCount.outOfDelivery}` : "loading..."}
            text="Out of Delivery"
            color="gradient-danger"
            inverse={currentWidget === "returned" ? false : true}
            value={
              currentWidget === "outOfDelivery" || hoverWidget === "outOfDelivery"
                ? 100
                : 0
            }
            style={{ cursor: "pointer" }}
            onMouseOver={() => handleWidgetMouseOver("outOfDelivery")}
            onMouseLeave={handleWidgetMouseLeave}
            onClick={(e) => {
              setCurrentWidget("outOfDelivery");
            }}
          >
            <CIcon name="cil-airplane-mode-off" height="36" />
          </CWidgetProgressIcon>
        </CCol>


      </CRow>
    </React.Fragment>
  );
};

export default Dashboard;
