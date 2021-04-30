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
import {getAllProducts} from "../../store/product/select";

const ProductTable = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const products = useSelector(getAllProducts);

    useEffect(async () => {
        setLoading(true);
        const res = await dispatch(thunks.product.getAllProducts());
        if (res.status !== 200) {
            toast.error(res.message);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        return () => toast.dismiss();
    }, []);

    const handleRemoveProduct = async (pCode) => {
        setLoading(true);
        const res = await dispatch(thunks.product.removeProduct(pCode));
        if (res.status !== 200) {
            toast.error(res.message);
        }
        toast.success("Product removed Successfully");
        setLoading(false);
    }

    const fields = [
        { key: "pCode", label: "Product Code", _style: { width: "30%" } },
        { key: "pName", label: "Product Name", _style: { width: "10%" } },
        { key: "color", label: "Color", _style: { width: "10%" } },
        { key: "size", label: "Size", _style: { width: "10%" } },
        { key: "stock", label: "stock", _style: { width: "10%" } },
        { key: "price", label: "price", _style: { width: "10%" } },
        { key: "categoryName", label: "categoryName", _style: { width: "10%" } },
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
                    <CCardHeader>Products</CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={products}
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
                                                    props.history.push(`/admin/product/update-product/${item.pCode}`);
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
                                                    handleRemoveProduct(item.pCode);
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

export default ProductTable;
