import {
    CBadge,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { thunks , cleanQuery} from "../../store/index";
import {getAllOrders} from "../../store/order/select";

const OrderTable = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const orders = useSelector(getAllOrders);

    useEffect(async () => {
        setLoading(true);
        const res = await dispatch(thunks.order.getAllOrders());
        if (res.status !== 200) {
            toast.error(res.message);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        return () => toast.dismiss();
    }, []);

    const fields = [
        { key: "orderStatus", label: "Order Status", _style: { width: "30%" } },
        { key: "paymentMethod", label: "Payment Method", _style: { width: "30%" } },
        { key: "grandTotal",label: "Grand Total", _style: { width: "20%" } },
        { key: "city",label: "City", _style: { width: "10%" } },
        { key: "mobile",label: "Mobile", _style: { width: "10%" } },
        { key: "deliveryCharge",label: "Delivery Charge", _style: { width: "10%" } },
        {
            key: "show_details",
            label: "",
            _style: { width: "1%" },
            sorter: false,
            filter: false,
        },
    ];
    const getBadge = (orderStatus) => {
        switch (orderStatus) {
            case "Out of Delivery":
                return "warning";
            case "Delivered":
                return "success";
            case "Processing":
                return "primary";
            default:
                return "primary";
        }
    };

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>Order</CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={orders}
                            fields={fields}
                            columnFilter
                            footer
                            loading={loading}
                            itemsPerPageSelect
                            itemsPerPage={20}
                            hover
                            sorter
                            pagination
                            scopedSlots={{
                                orderStatus: (item) => (
                                    <td>
                                        <CBadge color={getBadge(item.orderStatus)}>
                                            {item.orderStatus}
                                        </CBadge>
                                    </td>
                                ),
                                show_details: (item) => {
                                    return (
                                        <td className="py-2">
                                            <CButton
                                                color="primary"
                                                variant="outline"
                                                shape="square"
                                                size="sm"
                                                onClick={() => {
                                                    props.history.push(`/admin/order/update-order/${item.orderId}`);
                                                }}
                                            >
                                                Edit
                                            </CButton>
                                        </td>
                                    );
                                },
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default OrderTable;
