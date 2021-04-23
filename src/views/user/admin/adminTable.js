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
import { thunks } from "../../../store/index";
import { getAllAdmins} from "../../../store/user/select";

const AdminTable = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const admins = useSelector(getAllAdmins);

    useEffect(async () => {
        setLoading(true);
        const res = await dispatch(thunks.user.getAllAdmins());
        if (res.status !== 200) {
            toast.error(res.message);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        return () => toast.dismiss();
    }, []);

    const fields = [
        { key: "email", label: "Email", _style: { width: "30%" } },
        { key: "name", label: "Name", _style: { width: "10%" } },
        { key: "mobile", label: "Mobile Number", _style: { width: "10%" } },
        { key: "status",label: "Status", _style: { width: "10%" } },
        {
            key: "show_details",
            label: "",
            _style: { width: "1%" },
            sorter: false,
            filter: false,
        },
    ];

    const getBadge = (status) => {
        switch (status) {
            case false:
                return "warning";
            case true:
                return "success";
            default:
                return "primary";
        }
    };

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>All Admins</CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={admins}
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
                                            {(item.status)? "Active" : "Deactivated"}
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
                                                    props.history.push(`/admin/view-admin/${item.userId}`);
                                                }}
                                            >
                                                Show
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

export default AdminTable;
