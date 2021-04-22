import {
  CAlert,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFade,
  CForm,
  CRow,
  CModal,
  CButton,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CCallout,
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Form from "../../../components/common/NewForm";
import { thunks } from "../../../store";
import StepProgress from "../../../components/common/StepProgress";
import "../../../assets/local-css/order-form.css";

class OrderForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      senderOrderNumber: "",
      orderType: "Guest User",
      description: "",
      pickupDistrict: "",
      pickupCity: "",
      pickupStreet1: "",
      pickupStreet2: "",
      pickupTime: "",
      recipientName: "",
      recipientEmail: "",
      recipientTelephone: "",
      recipientTelephone2: "",
      recipientDistrict: "",
      recipientCity: "",
      recipientStreet1: "",
      recipientStreet2: "",
      paymentMethod: "",
      height: "",
      width: "",
      weight: "",
    },
    errors: {},
    btnDisable: false,
    spinner: false,
    districts: ["Galle", "Matara", "Colombo"],
    paymentMethods: ["Sender pays", "Delivery charge by recipient"],
    submissionOk: false,
    trackingId: "There is an error to load tracking id",
    modal: true,
    guestOrder: false,
    stepAtr: [],
    currentStep: 1,
    itemCharge: 0,
  };

  schema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    mobile: Joi.string().min(10).max(15).required().label("Contact Number"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email Address"),
    senderOrderNumber: Joi.string().required().label("Order Number"),
    description: Joi.string().allow("").label("Order Description"),
    pickupDistrict: Joi.string().required().label("Pickup District"),
    pickupCity: Joi.string().required().label("Pickup City"),
    pickupStreet1: Joi.string().required().label("Pickup Street 1"),
    pickupStreet2: Joi.string().allow("").label("Pickup Street 2"),
    pickupTime: Joi.string().required().label("Pickup Date and Time"),
    recipientName: Joi.string().required().label("Recipient's Name"),
    recipientEmail: Joi.string().required().label("Recipient Email"),
    recipientTelephone: Joi.string()
      .min(10)
      .max(15)
      .required()
      .label("Recipient's Mobile"),
    recipientTelephone2: Joi.string()
      .min(10)
      .max(15)
      .required()
      .label("Recipient's Alternative Contact No"),
    recipientDistrict: Joi.string().required().label("Recipient's District"),
    recipientCity: Joi.string().required().label("Recipient's City"),
    recipientStreet1: Joi.string().required().label("Recipient's Street 1"),
    recipientStreet2: Joi.string().allow("").label("Recipient's Street 2"),
    paymentMethod: Joi.string().required().label("Payment Method"),
    orderType: Joi.string().required().label("Order Type"),
    height: Joi.string().allow("").label("Height of the item"),
    width: Joi.string().allow("").label("Width of the item"),
    weight: Joi.string().required().label("Weight of the item"),
  };

  getStepAtr = (step) => {
    switch (step) {
      case 1:
        return [
          "firstName",
          "lastName",
          "mobile",
          "email",
          "senderOrderNumber",
          "description",
          "pickupDistrict",
          "pickupCity",
          "pickupStreet1",
          "pickupStreet2",
          "recipientName",
          "recipientEmail",
          "recipientTelephone",
          "recipientTelephone2",
          "recipientDistrict",
          "recipientCity",
          "recipientStreet1",
          "recipientStreet2",
          "orderType",
          "pickupTime",
        ];
      case 2:
        return ["paymentMethod", "height", "width", "weight"];
      default:
        return [];
    }
  };

  componentDidMount() {
    const stepAtr = this.getStepAtr(1);
    this.setState({ stepAtr });
  }

  componentWillUnmount() {
    toast.dismiss();
  }

  handleModalOnClose = () => {
    window.location = "/";
  };

  handleStepBackButton = () => {
    if (this.state.currentStep !== 1) {
      const currentStep = this.state.currentStep - 1;
      const stepAtr = this.getStepAtr(currentStep);
      this.setState({ currentStep, stepAtr });
    }
  };

  calculateItemCharge = () => {
    if (this.state.data.weight) {
      const weight = parseFloat(this.state.data.weight);
      const itemCharge = weight * 250;
      this.setState({ itemCharge });
    } else {
      this.setState({ itemCharge: 0 });
    }
  };

  render() {
    return (
      <React.Fragment>
        <CModal
          show={this.state.modal}
          onClose={this.handleModalOnClose}
          centered
          borderColor="primary"
          color="primary"
        >
          <CModalHeader closeButton>
            Do you want what type of order?
          </CModalHeader>
          <CModalBody>
            <CContainer>
              <CRow>
                <div style={{ display: "flex" }}>
                  <p
                    style={{ fontWeight: "bolder", fontSize: "20px" }}
                    className="mr-2"
                  >
                    <a
                      href="#"
                      onClick={() => {
                        this.setState({ modal: false, guestOrder: true });
                      }}
                    >
                      Place an order as a guest user
                    </a>
                  </p>
                </div>
                <div>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries.
                </div>
              </CRow>
              <CRow className="mt-2">
                <div style={{ display: "flex" }}>
                  <p
                    style={{ fontWeight: "bolder", fontSize: "20px" }}
                    className="mr-2"
                  >
                    <a
                      href="#"
                      onClick={() => {
                        window.location = "/auth/login";
                      }}
                    >
                      Place an order as a registered user
                    </a>
                  </p>
                </div>
                <div>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries.
                </div>
              </CRow>
            </CContainer>
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" onClick={this.handleModalOnClose}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
        <CContainer
          style={{ marginTop: "100px" }}
          hidden={
            this.state.submissionOk ||
            (this.state.modal ? true : !this.state.guestOrder)
          }
        >
          <CRow>
            <CCol xs="12" md="12">
              <CCard>
                <CCardHeader>Order Placement Form</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol md="3"></CCol>
                    <CCol md="6">
                      <StepProgress
                        show={true}
                        numOfSteps={2}
                        step={this.state.currentStep}
                        onBackBtnClick={this.handleStepBackButton}
                      />
                    </CCol>
                    <CCol md="3"></CCol>
                  </CRow>
                  <CForm onSubmit={this.handleSubmit}>
                    <div hidden={this.state.currentStep === 1 ? false : true}>
                      <p className="form-field-divider-title">Sender Details</p>
                      <hr className="form-field-divider-line"></hr>
                      <CRow>
                        <CCol xs="12" md="6">
                          {this.renderInput("firstName", "First Name", "text", {
                            placeholder: "Enter Your First Name..",
                          })}
                        </CCol>
                        <CCol xs="12" md="6">
                          {this.renderInput("lastName", "Last Name", "text", {
                            placeholder: "Enter Your Last Name..",
                          })}
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="12" md="6">
                          {this.renderInput(
                            "mobile",
                            "Contact Number",
                            "number",
                            {
                              placeholder: "Enter Your Mobile Number..",
                            }
                          )}
                        </CCol>
                        <CCol xs="12" md="6">
                          {this.renderInput("email", "Email Address", "text", {
                            placeholder: "Enter Your Email Address..",
                          })}
                        </CCol>
                      </CRow>
                      <p className="form-field-divider-title">
                        Basic Order Details
                      </p>
                      <hr className="form-field-divider-line"></hr>
                      <CRow>
                        <CCol xs="12" md="6">
                          {this.renderInput(
                            "senderOrderNumber",
                            "Sender Side Order Number",
                            "text",
                            {
                              placeholder: "Enter Your Order Number..",
                            }
                          )}
                        </CCol>
                      </CRow>
                      {this.renderTextArea(
                        "description",
                        "Item Description",
                        "6",
                        {
                          placeholder: "Enter Description..",
                        },
                        true
                      )}
                      <CRow>
                        <CCol xs="12" md="3">
                          {this.renderInput(
                            "pickupStreet1",
                            "Pickup Address Line 1",
                            "text",
                            {
                              placeholder: "Enter Address Line 1..",
                            }
                          )}
                        </CCol>
                        <CCol xs="12" md="3">
                          {this.renderInput(
                            "pickupStreet2",
                            "Pickup Address Line 2",
                            "text",
                            {
                              placeholder: "Enter Address Line 2..",
                            },
                            true
                          )}
                        </CCol>
                        <CCol xs="12" md="3">
                          {this.renderInput(
                            "pickupCity",
                            "Pickup City",
                            "text",
                            {
                              placeholder: "Enter City..",
                            }
                          )}
                        </CCol>
                        <CCol xs="12" md="3">
                          {this.renderSelect(
                            "pickupDistrict",
                            "Pickup District",
                            this.state.districts,
                            {
                              placeholder: "Select District..",
                            }
                          )}
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          {this.renderInput(
                            "pickupTime",
                            "Pickup Date and Time",
                            "datetime-local",
                            {
                              placeholder: "Select Date and Time..",
                            }
                          )}
                        </CCol>
                      </CRow>
                      <p className="form-field-divider-title">
                        Recipient Details
                      </p>
                      <hr className="form-field-divider-line"></hr>
                      <CRow>
                        <CCol xs="12" md="3">
                          {this.renderInput(
                            "recipientName",
                            "Recipient's Name",
                            "text",
                            {
                              placeholder: "Enter Name..",
                            }
                          )}
                        </CCol>
                        <CCol xs="12" md="3">
                          {this.renderInput(
                            "recipientTelephone",
                            "Recipient's Contact No",
                            "number",
                            {
                              placeholder: "Enter Mobile No..",
                            }
                          )}
                        </CCol>
                        <CCol xs="12" md="3">
                          {this.renderInput(
                            "recipientTelephone2",
                            "Recipient's Alternate Contact No",
                            "number",
                            {
                              placeholder: "Enter Alternate Mobile No..",
                            }
                          )}
                        </CCol>
                        <CCol xs="12" md="3">
                          {this.renderInput(
                            "recipientEmail",
                            "Recipient's Email",
                            "text",
                            {
                              placeholder: "Enter Email Address..",
                            }
                          )}
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="12" md="3">
                          {this.renderInput(
                            "recipientStreet1",
                            "Recipient's Address Line 1",
                            "text",
                            {
                              placeholder: "Enter Address Line 1..",
                            }
                          )}
                        </CCol>
                        <CCol xs="12" md="3">
                          {this.renderInput(
                            "recipientStreet2",
                            "Recipient's Address Line 2",
                            "text",
                            {
                              placeholder: "Enter Address Line 2..",
                            },
                            true
                          )}
                        </CCol>
                        <CCol xs="12" md="3">
                          {this.renderInput(
                            "recipientCity",
                            "Recipient's City",
                            "text",
                            {
                              placeholder: "Enter City..",
                            }
                          )}
                        </CCol>
                        <CCol xs="12" md="3">
                          {this.renderSelect(
                            "recipientDistrict",
                            "Recipient's District",
                            this.state.districts,
                            {
                              placeholder: "Select District..",
                            }
                          )}
                        </CCol>
                      </CRow>
                    </div>
                    <div hidden={this.state.currentStep === 2 ? false : true}>
                      <p className="form-field-divider-title">
                        Payment Details
                      </p>
                      <hr className="form-field-divider-line"></hr>
                      <CRow>
                        <CCol>
                          {this.renderSelect(
                            "paymentMethod",
                            "Payment Method",
                            this.state.paymentMethods,
                            {
                              placeholder: "Select Payment Method..",
                            }
                          )}
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="12" md="4">
                          {this.renderInput(
                            "height",
                            "Height of the Item (cm)",
                            "number",
                            {
                              placeholder: "Enter Height..",
                            },
                            true
                          )}
                        </CCol>
                        <CCol xs="12" md="4">
                          {this.renderInput(
                            "width",
                            "Width of the Item (cm)",
                            "number",
                            {
                              placeholder: "Enter Width..",
                            },
                            true
                          )}
                        </CCol>
                        <CCol xs="12" md="4">
                          {this.renderInput(
                            "weight",
                            "Weight of the Item (kg)",
                            "number",
                            {
                              placeholder: "Enter Weight..",
                              onKeyUp: this.calculateItemCharge,
                            }
                          )}
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          <CCallout color="warning" className={"bg-secondary"}>
                            <div className="estimated-value-container">
                              <p className="estimated-item-value-title">
                                Estimated Item Value:
                              </p>
                              <p className="estimated-item-value">
                                Rs {this.state.itemCharge}
                              </p>
                            </div>
                          </CCallout>
                        </CCol>
                      </CRow>
                    </div>
                    {this.renderButton("Place Order", "primary", "danger", {
                      hidden: this.state.currentStep === 2 ? false : true,
                    })}
                    {this.renderStepButton("Next", "primary", {
                      hidden: this.state.currentStep === 2 ? true : false,
                    })}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
        <CContainer hidden={!this.state.submissionOk}>
          <CRow>
            <CCol>
              <CFade>
                <CAlert color="light">
                  <CContainer>
                    <CRow className="d-flex justify-content-center">
                      <p style={{ fontSize: "40px", color: "green" }}>
                        Your order has successfully placed!
                      </p>
                    </CRow>
                    <CRow className="d-flex justify-content-center">
                      <p style={{ fontSize: "20px" }}>
                        Here is your order tracking number
                      </p>
                    </CRow>
                    <CRow className="d-flex justify-content-center">
                      <p style={{ fontSize: "30px", color: "red" }}>
                        {this.state.trackingId}
                      </p>
                    </CRow>
                  </CContainer>
                </CAlert>
              </CFade>
            </CCol>
          </CRow>
        </CContainer>
      </React.Fragment>
    );
  }

  async callServer() {
    this.setState({ spinner: true });
    const inputData = { ...this.state.data };
    inputData.pickupTime = inputData.pickupTime.replace("T", " ");
    const [res, data] = await this.props.newGuestOrder(inputData);
    this.setState({ spinner: false });
    if (res.status === 200) {
      this.setState({ submissionOk: true, trackingId: data.trackingId });
    } else {
      toast.error(res.message);
    }
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  newGuestOrder: (data) => dispatch(thunks.order.newGuestOrder(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
