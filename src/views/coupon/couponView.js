import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CForm, CInput, CLabel,
    CRow,
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Form from "../../components/common/NewForm";
import { thunks , cleanQuery} from "../../store/index";
import {getAllCoupons} from "../../store/order/select";

class CouponView extends Form {
    state = {

        data: {
            couponCode : "",
            amountType : "",
            amount : "",
            expiryDate : "",
            status : "",
        },
        coupons : [],
        couponId : "",
        amountType : ["Voucher", "Discount"],
        status : ["Available" , "Not Available"],
        errors: {},
        btnDisable: false,
        spinner: false,
    };

    getCouponById = (couponId) => {
        const coupon = this.props.coupons.find((item) => {
            return item.couponId == couponId;
        });
        if (!coupon) {
            toast.error("Coupon Not found");
            return;
        }
        return coupon;
    };



    schema = {
        status: Joi.string().optional().label("Coupon Status"),
        amountType: Joi.string().optional().label("Amount Type"),
        couponCode: Joi.string().optional().label("Coupon Code"),
        amount: Joi.number().optional().label("Amount"),
        expiryDate: Joi.date().optional().label("Expiry Date"),

    };

    async componentDidMount() {
        const res = await this.props.getAllCoupons();
        if (res.status === 200) {
            const coupon = this.getCouponById(this.props.match.params.couponId);
            if (coupon) {
                const couponId = this.props.match.params.couponId;
                const updateData = cleanQuery(coupon,
                    ["status", "amountType", "couponCode", "expiryDate", "amount"]);
                this.setState({data : {...updateData}, couponId});
                console.log(this.state.data);
            }else{
                this.setState({ loading: false, error: true });
                toast.error("Coupon not found");
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
                            <CCardHeader>Change Coupon</CCardHeader>
                            <CCardBody>
                                <CForm action="" method="post" onSubmit={this.handleSubmit}>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            <CLabel htmlFor="couponCode">Coupon Code</CLabel>
                                            <CInput id="couponCode" readOnly value={this.state.data.couponCode} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderSelect("amountType", "Coupon Type", this.state.amountType, {
                                                placeholder: "Enter Coupon Type",
                                            })}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("amount", "Amount", "text", {
                                                placeholder: "Enter coupon amount",
                                            })}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderDateInput("expiryDate", "Expiry Date", "date", {
                                                placeholder: "Enter coupon expiry date"
                                            })}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderSelect(
                                                "status", "Status", this.state.status
                                            )}
                                        </CCol>
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
        const couponData = cleanQuery(data, ["amount", "status", "amountType",
        "expiryDate"]);
        const res = await this.props.updateCoupon(this.state.couponId, couponData);
        this.setState({ spinner: false });
        if (res.status === 200) {
            this.props.history.push("/admin/coupon/view-coupons");
        } else {

            toast.error(res.message);
        }
    }
}

const mapStateToProps = (state) => ({
    coupons: getAllCoupons(state),
});

const mapDispatchToProps = (dispatch) => ({
    getAllCoupons : () => dispatch(thunks.order.getAllCoupons()),
    updateCoupon : (couponId, couponData) => dispatch(thunks.order.updateCoupon(couponId,couponData))
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponView);
