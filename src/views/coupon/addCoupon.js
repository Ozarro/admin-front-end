import {
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend, CInputGroupText, CInvalidFeedback,
  CLabel,
  CRow, CSelect
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardContainer from "../../components/common/CardContainer";
import Form from "../../components/common/NewForm";
import { thunks } from "../../store/index";
import CIcon from "@coreui/icons-react";

class CategoryAdd extends Form {
  state = {
    data: {
      amountType : "",
      amount : "",
      expiryDate : "",
    },
    errors: {},
    couponCode : "",
    amountType : ["Voucher", "Discount"],
    status : ["Available", "Not Available"],
    btnDisable: false,
    spinner: false,
    error: false,
    loading: true,
  };

  schema = {
    amountType: Joi.string().label("Amount Type"),
    expiryDate: Joi.date().iso().min(new Date()).label("Expiry Date"),
    amount: Joi.number().label("Amount"),
  };

  async componentDidMount() {
    this.setState({ loading: false, error: false });
  }

  componentWillUnmount() {
    toast.dismiss();
  }

  render() {
    return (
      <CContainer>
        <CRow>
          <CCol>
            <CardContainer
              error={this.state.error}
              loading={this.state.loading}
              header="Add Coupon"
            >
              <CForm onSubmit={this.handleSubmit}>
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
                    {this.renderInput("expiryDate", "Expiry Date", "date", {
                      placeholder: "Enter coupon expiry date",
                    })}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>{this.renderButton("Save", "success", "danger")}</CCol>
                </CRow>
              </CForm>
            </CardContainer>
          </CCol>
        </CRow>
      </CContainer>
    );
  }

  async callServer() {
    this.setState({ spinner: true });
    const couponData = this.state.data;
    const res = await this.props.generateCoupon(couponData);

    this.setState({ spinner: false });

    if (res.status === 200) {
      console.log("Coupon data",res.data);
      if(res.data){
        toast.success(`Couopon Code : ${res.data.couponCode}`);
      }else{
        toast.success(res.message);
      }

      // this.props.history.push("/admin/product/view-categories");
    } else {
      if (res.status !== 200) toast.error(res.message);
    }
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  generateCoupon : (couponData) => dispatch(thunks.order.addCoupon(couponData)),

});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAdd);
