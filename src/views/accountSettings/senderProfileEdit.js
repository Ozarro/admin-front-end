import { CCol, CContainer, CForm, CRow } from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardContainer from "../../components/common/CardContainer";
import Form from "../../components/common/NewForm";
import { thunks } from "../../store/index";
import { getProfileData } from "../../store/user/select";

class SenderProfileEdit extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      telephone: "",
      district: "",
      city: "",
      street1: "",
      street2: "",
      businessName: "",
      paymentMethod: "",
    },
    errors: {},
    btnDisable: false,
    spinner: false,
    addressCity: {
      Colombo: ["Moratuwa", "Dehiwala"],
    },
    paymentMethods: ["Monthly", "Weekly"],
    error: false,
    loading: true,
  };

  schema = {
    firstName: Joi.string().alphanum().label("First Name"),
    lastName: Joi.string().alphanum().label("Last Name"),
    telephone: Joi.string().min(9).max(13).required().label("Contact Number"),
    district: Joi.string().required().label("District"),
    city: Joi.string().required().label("City"),
    street1: Joi.string().required().label("Street 1"),
    street2: Joi.string().required().label("Street 2"),
    businessName: Joi.string().required().label("Business Name"),
    paymentMethod: Joi.string().required().label("Payment Method"),
  };

  async componentDidMount() {
    //dispatch the event to get the district and cities
    //set to the local states
    const res = await this.props.getProfileDetails();
    if (res.status === 200) {
      const data = { ...this.props.profileData };
      delete data.userId;
      delete data.locationId;
      delete data.registrarAdminId;
      this.setState({ data, loading: false });
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
          <CCol>
            <CardContainer
              error={this.state.error}
              loading={this.state.loading}
              header="Edit Profile"
            >
              <CForm onSubmit={this.handleSubmit}>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("firstName", "First Name", "text", {
                      placeholder: "Enter Your First Name",
                    })}
                  </CCol>
                  <CCol xs="12" md="6">
                    {this.renderInput("lastName", "Last Name", "text", {
                      placeholder: "Enter Your Last Name",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("telephone", "Contact Number", "text", {
                      placeholder: "Enter Your Mobile Number",
                    })}
                  </CCol>
                  <CCol xs="12" md="6">
                    {this.renderInput("businessName", "Business Name", "text", {
                      placeholder: "Enter Your Business Name",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="3">
                    {this.renderInput("street1", "Address Street 1", "text", {
                      placeholder: "Enter Street 1",
                    })}
                  </CCol>
                  <CCol xs="12" md="3">
                    {this.renderInput("street2", "Address Street 2", "text", {
                      placeholder: "Enter Street 2",
                    })}
                  </CCol>
                  <CCol xs="12" md="3">
                    {this.renderSelect(
                      "district",
                      "Address District",
                      Object.keys(this.state.addressCity)
                    )}
                  </CCol>
                  <CCol xs="12" md="3">
                    {this.renderSelect(
                      "city",
                      "Address City",
                      this.state.addressCity[this.state.data.district]
                    )}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderSelect(
                      "paymentMethod",
                      "Payment Method",
                      this.state.paymentMethods
                    )}
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
    const profileData = { ...this.state.data };
    profileData.street_1 = profileData.street1;
    profileData.street_2 = profileData.street2;
    delete profileData.street1;
    delete profileData.street2;
    delete profileData.paymentMethod;
    const res1 = await this.props.updateProfileDetails(profileData);
    const res2 = await this.props.updatePaymentMethod(
      this.state.data.paymentMethod
    );
    this.setState({ spinner: false });
    if (res1.status === 200 && res2.status === 200) {
      this.props.history.push("/my/profile");
    } else {
      if (res1.status !== 200) toast.error(res1.message);
      if (res2.status !== 200) toast.error(res2.message);
    }
  }
}

const mapStateToProps = (state) => ({
  profileData: getProfileData(state),
});

const mapDispatchToProps = (dispatch) => ({
  getProfileDetails: () => dispatch(thunks.user.getProfileDetails()),
  updateProfileDetails: (profileData) =>
    dispatch(thunks.user.updateProfileDetails(profileData)),
  updatePaymentMethod: (paymentMethod) =>
    dispatch(thunks.user.updatePaymentMethod(paymentMethod)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SenderProfileEdit);
