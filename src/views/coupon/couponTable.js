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
import {getAllCoupons} from "../../store/order/select";

const CouponTable = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const coupons = useSelector(getAllCoupons);

    useEffect(async () => {
        setLoading(true);
        const res = await dispatch(thunks.order.getAllCoupons());
        if (res.status !== 200) {
            toast.error(res.message);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        return () => toast.dismiss();
    }, []);

    const handeRemoveCoupon = async (couponId) => {
        setLoading(true);
        const res = await dispatch(thunks.order.removeCoupon(couponId));
        if (res.status !== 200) {
            toast.error(res.message);
        }
        toast.success("Coupon removed Successfully");
        setLoading(false);
    }

    const fields = [
        { key: "couponCode", label: "Coupon Code", _style: { width: "30%" } },
        { key: "amount", label: "Amount", _style: { width: "30%" } },
        { key: "amountType",label: "Coupon Type", _style: { width: "20%" } },
        // { key: "expiryDate",label: "Expiry Date", _style: { width: "10%" } },
        { key: "status",label: "Status", _style: { width: "10%" } },
        {
            key: "show_details",
            label: "",
            _style: { width: "1%" },
            sorter: false,
            filter: false,
        },
        {
            key: "remove_item",
            label: "",
            _style: { width: "1%" },
            sorter: false,
            filter: false,
        },
    ];
    const getBadge = (status) => {
        switch (status) {
            case "Not Available":
                return "warning";
            case "Available":
                return "success";
            default:
                return "primary";
        }
    };

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>Coupon</CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={coupons}
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
                                status: (item) => (
                                    <td>
                                        <CBadge color={getBadge(item.status)}>
                                            {item.status}
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
                                                    props.history.push(`/admin/coupon/update-coupon/${item.couponId}`);
                                                }}
                                            >
                                                Edit
                                            </CButton>
                                        </td>
                                    );
                                },
                                remove_item: (item) => {
                                    return (
                                        <td className="py-2">
                                            <CButton
                                                color="danger"
                                                // variant="outline"
                                                shape="rounded-pill"
                                                size="sm"
                                                onClick={() => {
                                                    handeRemoveCoupon(item.couponId);
                                                }}
                                            >
                                                Remove
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

export default CouponTable;
