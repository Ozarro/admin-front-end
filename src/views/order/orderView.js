import {
    CBadge, CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer, CDataTable,
    CForm, CInput, CLabel,
    CRow,
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Form from "../../components/common/NewForm";
import { thunks , cleanQuery} from "../../store/index";
import { getAllOrders} from "../../store/order/select";

class OrderView extends Form {
    state = {

        data: {
            orderStatus : "",
        },
        orderData : {},
        coupons : [],
        orderId : "",
        orderStatus : ["Processing", "Out of Delivery", "Delivered"],
        errors: {},
        btnDisable: false,
        spinner: false,
        fields : [
            { key: "p_name", label: "Product Name", _style: { width: "30%" } },
            { key: "category_name", label: "Category Name", _style: { width: "30%" } },
            { key: "quantity",label: "quantity", _style: { width: "20%" } },
            { key: "stock",label: "Stock", _style: { width: "10%" } },
            { key: "cart_item_price",label: "Item Price", _style: { width: "10%" } },
        ],
    };


    getOrderById = (orderId) => {
        const order = this.props.orders.find((item) => {
            return item.orderId == orderId;
        });
        if (!order) {
            toast.error("Order Not found");
            return;
        }
        return order;
    };



    schema = {
        orderStatus: Joi.string().optional().label("Order Status"),

    };

    async componentDidMount() {
        const res = await this.props.getAllOrders();
        if (res.status === 200) {
            const order = this.getOrderById(this.props.match.params.orderId);
            if (order) {
                const orderId = this.props.match.params.couponId;
                // const updateData = cleanQuery(order,
                //     ["status", "amountType", "couponCode", "expiryDate", "amount"]);
                this.setState({data : {orderStatus : order.orderStatus}, orderData : order
                , orderId : order.orderId});
            }else{
                this.setState({ loading: false, error: true });
                toast.error("Order not found");
            }

        } else {
            this.setState({ loading: false, error: true });
            toast.error(res.message);
        }
    }

    componentWillUnmount() {
        toast.dismiss();
    }

    render() {
        return (
            <CContainer>
                <CRow>
                    <CCol xs="12" md="12">
                        <CCard>
                            <CCardHeader>Change Order</CCardHeader>
                            <CCardBody>
                                <CForm action="" method="post" onSubmit={this.handleSubmit}>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            <CLabel htmlFor="orderId">Order Id</CLabel>
                                            <CInput id="orderId" readOnly value={this.state.orderData.orderId} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            <CLabel htmlFor="city">City</CLabel>
                                            <CInput id="city" readOnly value={this.state.orderData.city} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            <CLabel htmlFor="street1">Street 1</CLabel>
                                            <CInput id="street1" readOnly value={this.state.orderData.street1} />
                                        </CCol>
                                        <CCol xs="12" md="6">
                                            <CLabel htmlFor="street2">Street 2</CLabel>
                                            <CInput id="street2" readOnly value={this.state.orderData.street2} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            <CLabel htmlFor="grandTotal">Grand Total</CLabel>
                                            <CInput id="grandTotal" readOnly value={this.state.orderData.grandTotal} />
                                        </CCol>
                                        <CCol xs="12" md="6">
                                            <CLabel htmlFor="deliveryCharge">Delivery Charge</CLabel>
                                            <CInput id="deliveryCharge" readOnly value={this.state.orderData.deliveryCharge} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            <CLabel htmlFor="paymentMethod">Payment Method</CLabel>
                                            <CInput id="paymentMethod" readOnly value={this.state.orderData.paymentMethod} />
                                        </CCol>
                                        <CCol xs="12" md="6">
                                            {this.renderSelect(
                                                "orderStatus", "Order Status", this.state.orderStatus
                                            )}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CDataTable
                                            items={this.state.orderData.cartItems}
                                            fields={this.state.fields}
                                            columnFilter
                                            footer
                                            loading={this.state.loading}
                                            itemsPerPageSelect
                                            itemsPerPage={20}
                                            hover
                                            sorter
                                            pagination
                                        />

                                    </CRow>

                                    {this.renderButton("Submit", "primary", "danger")}

                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        );
    }

    async callServer() {
        this.setState({ spinner: true });
        const data = this.state.data;
        const orderData = cleanQuery(data, ["orderStatus"]);
        const res = await this.props.updateOrder(this.state.orderId, orderData);
        this.setState({ spinner: false });
        if (res.status === 200) {
            this.props.history.push("/admin/order/view-orders");
        } else {

            toast.error(res.message);
        }
    }
}

const mapStateToProps = (state) => ({
    orders: getAllOrders(state),
});

const mapDispatchToProps = (dispatch) => ({
    getAllOrders : () => dispatch(thunks.order.getAllOrders()),
    updateOrder : (orderId, orderData) => dispatch(thunks.order.updateOrder(orderId,orderData))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderView);
