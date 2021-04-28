// import CIcon from "@coreui/icons-react";
// import {
//   CBadge,
//   CButton,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CDataTable,
//   CPopover,
//   CRow,
//   CWidgetProgressIcon,
// } from "@coreui/react";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { thunks } from "../../store/index";
//
// const Dashboard = (props) => {
//   const dispatch = useDispatch();
//   const orderCounts = useSelector(selectOrderCount);
//   const allOrderStatus = useSelector(selectOrderStatus);
//   const orders = useSelector(selectAllOrders);
//   const [filterOrders, setFilterOrders] = useState([]);
//   const [amountError, setAmountError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [hoverWidget, setHoverWidget] = useState("none");
//   const [currentWidget, setCurrentWidget] = useState("all");
//
//   useEffect(async () => {
//     setLoading(true);
//     let res = await dispatch(thunks.order.getOrderCounts());
//     if (res.status !== 200) {
//       setAmountError(true);
//       toast.error(res.message);
//     }
//
//     res = await dispatch(thunks.order.getAllStatus());
//     if (res && res.status !== 200) {
//       toast.error(res.message);
//     }
//
//     res = await dispatch(thunks.order.getAllOrders());
//     if (res.status !== 200) {
//       toast.error(res.message);
//     }
//     setLoading(false);
//   }, []);
//
//   useEffect(() => {
//     if (currentWidget === "all") {
//       setFilterOrders(orders);
//       return;
//     }
//
//     let status;
//     if (currentWidget === "delivered") {
//       status = ["Delivered"];
//     } else if (currentWidget === "pending") {
//       status = ["Pending", "Driver Assigned", "Collected"];
//     } else if (currentWidget === "returned") {
//       status = ["Returned", "Returned Collected", "Returned Delivered"];
//     } else {
//       status = ["Rejected"];
//     }
//
//     const data = orders.filter((item) => {
//       return status.includes(item.status);
//     });
//
//     setFilterOrders(data);
//   }, [currentWidget, orders]);
//
//   useEffect(() => {
//     return () => toast.dismiss();
//   }, []);
//
//   const makeOrderCounts = () => {
//     const counts = {
//       delivered: 0,
//       returned: 0,
//       pending: 0,
//       rejected: 0,
//     };
//     orderCounts.map((item) => {
//       if (item.status === "Pending")
//         counts.pending = counts.pending + parseInt(item.count);
//       if (item.status === "Driver Assigned")
//         counts.pending = counts.pending + parseInt(item.count);
//       if (item.status === "Collected")
//         counts.pending = counts.pending + parseInt(item.count);
//       if (item.status === "Delivered")
//         counts.delivered = counts.delivered + parseInt(item.count);
//       if (item.status === "Returned")
//         counts.returned = counts.returned + parseInt(item.count);
//       if (item.status === "Returned Collected")
//         counts.returned = counts.returned + parseInt(item.count);
//       if (item.status === "Returned Delivered")
//         counts.returned = counts.returned + parseInt(item.count);
//       if (item.status === "Rejected")
//         counts.rejected = counts.rejected + parseInt(item.count);
//     });
//     return counts;
//   };
//
//   const orderCount = makeOrderCounts();
//
//   const fields = [
//     { key: "refNo", label: "Global Order Number", _style: { width: "10%" } },
//     {
//       key: "orderNumber",
//       label: "Sender Side Order Number",
//       _style: { width: "10%" },
//     },
//     { key: "createdDate", label: "Created Date", _style: { width: "10%" } },
//     { key: "createdTime", label: "Created Time", _style: { width: "10%" } },
//     { key: "recipientName", label: "Recipient Name", _style: { width: "20%" } },
//     {
//       key: "district",
//       label: "Recepient District",
//       _style: { width: "10%" },
//     },
//     {
//       key: "city",
//       label: "Recepient City",
//       _style: { width: "10%" },
//     },
//     { key: "status", _style: { width: "10%" } },
//     {
//       key: "show_details",
//       label: "",
//       _style: { width: "1%" },
//       sorter: false,
//       filter: false,
//     },
//   ];
//
//   const getBadge = (status) => {
//     switch (status) {
//       case "Delivered":
//         return "success";
//       case "Returned":
//         return "secondary";
//       case "Returned Collected":
//         return "secondary";
//       case "Returned Delivered":
//         return "secondary";
//       case "Pending":
//         return "warning";
//       case "Driver Assigned":
//         return "info";
//       case "Collected":
//         return "primary";
//       case "Rejected":
//         return "danger";
//       default:
//         return "dark";
//     }
//   };
//
//   const getBadgeDescription = (status) => {
//     const obj = allOrderStatus.find((s) => {
//       return s.status === status;
//     });
//     return obj ? obj.description : "";
//   };
//
//   const handleWidgetMouseOver = (name) => {
//     setHoverWidget(name);
//   };
//
//   const handleWidgetMouseLeave = () => {
//     setHoverWidget("none");
//   };
//
//   return (
//     <React.Fragment>
//       <CRow hidden={amountError} className="justify-content-center">
//         <CCol sm="12" md="4">
//           <CWidgetProgressIcon
//             header={
//               !loading
//                 ? `${
//                     orderCount.delivered +
//                     orderCount.pending +
//                     orderCount.rejected +
//                     orderCount.returned
//                   }`
//                 : "loading..."
//             }
//             text="All Orders"
//             color="gradient-info"
//             inverse={currentWidget === "all" ? false : true}
//             value={currentWidget === "all" || hoverWidget === "all" ? 100 : 0}
//             style={{ cursor: "pointer" }}
//             onMouseOver={() => handleWidgetMouseOver("all")}
//             onMouseLeave={handleWidgetMouseLeave}
//             onClick={(e) => {
//               setCurrentWidget("all");
//             }}
//           >
//             <CIcon name="cil-gift" height="36" />
//           </CWidgetProgressIcon>
//         </CCol>
//         <CCol sm="12" md="2">
//           <CWidgetProgressIcon
//             header={!loading ? `${orderCount.delivered}` : "loading..."}
//             text="Delivered Orders"
//             color="gradient-success"
//             inverse={currentWidget === "delivered" ? false : true}
//             value={
//               currentWidget === "delivered" || hoverWidget === "delivered"
//                 ? 100
//                 : 0
//             }
//             style={{ cursor: "pointer" }}
//             onMouseOver={() => handleWidgetMouseOver("delivered")}
//             onMouseLeave={handleWidgetMouseLeave}
//             onClick={(e) => {
//               setCurrentWidget("delivered");
//             }}
//           >
//             <CIcon name="cil-gift" height="36" />
//           </CWidgetProgressIcon>
//         </CCol>
//         <CCol sm="12" md="2">
//           <CWidgetProgressIcon
//             header={!loading ? `${orderCount.returned}` : "loading..."}
//             text="Returned Orders"
//             color="gradient-warning"
//             inverse={currentWidget === "returned" ? false : true}
//             value={
//               currentWidget === "returned" || hoverWidget === "returned"
//                 ? 100
//                 : 0
//             }
//             style={{ cursor: "pointer" }}
//             onMouseOver={() => handleWidgetMouseOver("returned")}
//             onMouseLeave={handleWidgetMouseLeave}
//             onClick={(e) => {
//               setCurrentWidget("returned");
//             }}
//           >
//             <CIcon name="cil-arrow-thick-from-right" height="36" />
//           </CWidgetProgressIcon>
//         </CCol>
//         <CCol sm="12" md="2">
//           <CWidgetProgressIcon
//             header={!loading ? `${orderCount.pending}` : "loading..."}
//             text="Pending Orders"
//             color="gradient-primary"
//             inverse={currentWidget === "pending" ? false : true}
//             value={
//               currentWidget === "pending" || hoverWidget === "pending" ? 100 : 0
//             }
//             style={{ cursor: "pointer" }}
//             onMouseOver={() => handleWidgetMouseOver("pending")}
//             onMouseLeave={handleWidgetMouseLeave}
//             onClick={(e) => {
//               setCurrentWidget("pending");
//             }}
//           >
//             <CIcon name="cil-sync" height="36" />
//           </CWidgetProgressIcon>
//         </CCol>
//         <CCol sm="12" md="2">
//           <CWidgetProgressIcon
//             header={!loading ? `${orderCount.rejected}` : "loading..."}
//             text="Rejected Orders"
//             color="gradient-danger"
//             inverse={currentWidget === "rejected" ? false : true}
//             value={
//               currentWidget === "rejected" || hoverWidget === "rejected"
//                 ? 100
//                 : 0
//             }
//             style={{ cursor: "pointer" }}
//             onMouseOver={() => handleWidgetMouseOver("rejected")}
//             onMouseLeave={handleWidgetMouseLeave}
//             onClick={(e) => {
//               setCurrentWidget("rejected");
//             }}
//           >
//             <CIcon name="cil-trash" height="36" />
//           </CWidgetProgressIcon>
//         </CCol>
//       </CRow>
//       <CRow>
//         <CCol>
//           <CCard>
//             <CCardHeader>Your All Orders</CCardHeader>
//             <CCardBody>
//               <CDataTable
//                 items={filterOrders}
//                 fields={fields}
//                 columnFilter
//                 footer
//                 loading={loading}
//                 itemsPerPageSelect
//                 itemsPerPage={5}
//                 hover
//                 sorter
//                 pagination
//                 scopedSlots={{
//                   status: (item) => (
//                     <td>
//                       <CPopover content={getBadgeDescription(item.status)}>
//                         <CBadge color={getBadge(item.status)}>
//                           {item.status}
//                         </CBadge>
//                       </CPopover>
//                     </td>
//                   ),
//                   show_details: (item) => {
//                     return (
//                       <td className="py-2">
//                         <CButton
//                           color="primary"
//                           variant="outline"
//                           shape="square"
//                           size="sm"
//                           onClick={() => {
//                             props.history.push(
//                               `/my/order/details/${item.orderId}`
//                             );
//                           }}
//                         >
//                           Show
//                         </CButton>
//                       </td>
//                     );
//                   },
//                 }}
//               />
//             </CCardBody>
//           </CCard>
//         </CCol>
//       </CRow>
//     </React.Fragment>
//   );
// };
//
// export default Dashboard;
