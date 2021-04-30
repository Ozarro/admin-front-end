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
import {getAllCategories} from "../../store/product/select";

const CategoryTable = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const categories = useSelector(getAllCategories);

    useEffect(async () => {
        setLoading(true);
        const res = await dispatch(thunks.product.getAllCategory());
        if (res.status !== 200) {
            toast.error(res.message);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        return () => toast.dismiss();
    }, []);

    const handleRemoveCategory = async (categoryId) => {
        setLoading(true);
        const res = await dispatch(thunks.product.removeCategory(categoryId));
        if (res.status !== 200) {
            toast.error(res.message);
        }
        toast.success("Category removed Successfully");
        setLoading(false);
    }

    const fields = [
        { key: "name", label: "Category Name", _style: { width: "30%" } },
        { key: "description", label: "description", _style: { width: "50%" } },
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
                    <CCardHeader>Category</CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={categories}
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
                                                    props.history.push(`/admin/category/update-category/${item.categoryId}`);
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
                                                    handleRemoveCategory(item.categoryId);
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

export default CategoryTable;
