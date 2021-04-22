import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CRow,
  CCallout,
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import StepProgress from "../../../components/common/StepProgress";
import api from "../../../api";
import Form from "../../../components/common/NewForm";
import { thunks } from "../../../store";
import "../../../assets/local-css/order-form.css";

//display guest

class OrderForm extends Form {
  state = {
    data: {
      senderOrderNumber: "",
      orderType: "",
      description: "",
      recipientName: "",
      recipientEmail: "",
      recipientTelephone: "",
      recipientTelephone2: "",
      recipientDistrict: "",
      recipientCity: "",
      recipientStreet1: "",
      recipientStreet2: "",
      paymentMethod: "",
      orderCharge: "",
      telephone: "",
      district: "",
      city: "",
      agentUserId: "",
      height: "",
      width: "",
      weight: "",
      pickupTime: "",
      pickupLocation: "",
    },
    errors: {},
    btnDisable: false,
    spinner: false,
    visibleAgent: false,
    agents: [],
    orderTypes: ["Pickup From Sender", "Through Agent"],
    districts: ["Galle", "Kaluthara", "Colombo"],
    paymentMethods: [
      "Sender pays",
      "Cash on delivery",
      "Delivery charge by recipient",
      "Credit facility",
    ],
    filterAgentDistricts: [],
    filterAgentCities: [],
    filterAgentNames: [],
    filterAgentIds: [],
    stepAtr: [],
    currentStep: 1,
    itemCharge: 0,
    pickupAddressOptions: {
      names: [],
      values: [],
    },
  };

  schema = {
    senderOrderNumber: Joi.string().required().label("Order Number"),
    description: Joi.string().allow("").label("Order Description"),
    recipientName: Joi.string().required().label("Recipient's Name"),
    recipientEmail: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Recipient Email"),
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
    recipientStreet1: Joi.string()
      .required()
      .label("Recipient's Address Line 1"),
    recipientStreet2: Joi.string()
      .allow("")
      .label("Recipient's Address Line 2"),
    paymentMethod: Joi.string().required().label("Payment Method"),
    orderCharge: Joi.string().required().label("Order Charge"),
    orderType: Joi.string().required().label("Order Type"),
    telephone: Joi.string().min(10).max(15).required().label("Contact No"),
    height: Joi.number().allow("").label("Height of the item"),
    width: Joi.number().allow("").label("Width of the item"),
    weight: Joi.number().required().label("Weight of the item"),
    pickupTime: Joi.string().required().label("Pickup Date and Time"),
    pickupLocation: Joi.string()
      .when("orderType", {
        is: "Through Agent",
        otherwise: Joi.required(),
        then: Joi.allow(""),
      })
      .label("Pickup Address"),
    district: Joi.string()
      .when("orderType", {
        is: "Through Agent",
        otherwise: Joi.allow(""),
        then: Joi.required(),
      })
      .label("Agent District"),
    city: Joi.string()
      .when("orderType", {
        is: "Through Agent",
        otherwise: Joi.allow(""),
        then: Joi.required(),
      })
      .label("Agent City"),
    agentUserId: Joi.string()
      .when("orderType", {
        is: "Through Agent",
        otherwise: Joi.allow(""),
        then: Joi.required(),
      })
      .label("Agent Name"),
  };

  getStepAtr = (step) => {
    switch (step) {
      case 1:
        return [
          "senderOrderNumber",
          "description",
          "orderType",
          "recipientName",
          "recipientEmail",
          "recipientTelephone",
          "recipientTelephone2",
          "recipientDistrict",
          "recipientCity",
          "recipientStreet1",
          "recipientStreet2",
          "telephone",
          "district",
          "city",
          "agentUserId",
          "pickupTime",
          "pickupLocation",
        ];
      case 2:
        return ["paymentMethod", "height", "width", "weight", "orderCharge"];
      default:
        return [];
    }
  };

  async componentDidMount() {
    const stepAtr = this.getStepAtr(1);
    this.setState({ stepAtr });

    const [res, agents] = await api.user.get.agentLocations();
    if (res.status === 200) {
      this.setState({ agents });
    } else {
      toast.error(res.message);
    }
    this.getDistricts();

    if (this.props.userData.accountType === "Business Sender") {
      const pickupAddressOptions = {
        names: ["Same as personal address", "same as business address"],
        values: ["personal", "business"],
      };
      this.setState({ pickupAddressOptions });
    } else if (this.props.userData.accountType === "Normal Sender") {
      const pickupAddressOptions = {
        names: ["Same as personal address"],
        values: ["personal"],
      };
      this.setState({ pickupAddressOptions });
    }
  }

  componentWillUnmount() {
    toast.dismiss();
  }

  getDistricts = () => {
    const district = this.state.agents.map((agent) => {
      return agent.district;
    });
    this.setState({ filterAgentDistricts: district });
  };

  getCities = () => {
    let cities = [];
    if (this.state.data.district !== "") {
      cities = this.state.agents.map((agent) => {
        if (agent.district === this.state.data.district) {
          return agent.city;
        }
      });
    }
    this.setState({ filterAgentCities: cities });
  };

  getAgents = () => {
    let names = [];
    let ids = [];
    if (this.state.data.district !== "" && this.state.data.city !== "") {
      this.state.agents.map((agent) => {
        if (
          agent.district === this.state.data.district &&
          agent.city === this.state.data.city
        ) {
          names.push(`${agent.firstName} ${agent.lastName}`);
          ids.push(agent.userId);
        }
      });
    }
    this.setState({ filterAgentNames: names, filterAgentIds: ids });
  };

  getLocationId = (userId) => {
    const agent = this.state.agents.find((agent) => {
      return agent.userId === userId;
    });
    return agent.locationId;
  };

  getSenderLocationId = async (type) => {
    if (type === "personal") {
      const [res, data] = await api.user.get.personalAddress();
      if (res.status === 200) {
        return data.locationId;
      } else {
        toast.error(res.message);
      }
    } else {
      const [res, data] = await api.user.get.businessAddress();
      if (res.status === 200) {
        return data.businessLocationId;
      } else {
        toast.error(res.message);
      }
    }
    return null;
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
    }
  };

  render() {
    return (
      <CContainer>
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
                    <p className="form-field-divider-title">
                      Basic Order Details
                    </p>
                    <hr className="form-field-divider-line"></hr>
                    {this.renderInput(
                      "senderOrderNumber",
                      "Sender Side Order Number",
                      "text",
                      {
                        placeholder: "Enter Your Order Number..",
                      }
                    )}
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
                      <CCol xs="12" md="6">
                        {this.renderSelect(
                          "orderType",
                          "Order Type",
                          this.state.orderTypes,
                          {
                            placeholder: "Select Order Type..",
                            onClick: this.handleVisible,
                          }
                        )}
                      </CCol>
                      <CCol xs="12" md="6">
                        {this.renderInput(
                          "telephone",
                          "Contact Number",
                          "number",
                          {
                            placeholder: "Enter Mobile Number..",
                          }
                        )}
                      </CCol>
                    </CRow>
                    <CRow hidden={this.state.visibleAgent}>
                      <CCol>
                        {this.renderRadioGroup(
                          "Pickup Address",
                          "pickupLocation",
                          this.state.pickupAddressOptions.names,
                          this.state.pickupAddressOptions.values
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
                    <div hidden={!this.state.visibleAgent}>
                      <p className="form-field-divider-title">Agent Details</p>
                      <hr className="form-field-divider-line"></hr>
                      <CRow>
                        <CCol xs="12" md="4">
                          {this.renderSelect(
                            "district",
                            "Agent District",
                            this.state.filterAgentDistricts,
                            {
                              placeholder: "Select District..",
                              onClick: this.getCities,
                            }
                          )}
                        </CCol>
                        <CCol xs="12" md="4">
                          {this.renderSelect(
                            "city",
                            "Agent City",
                            this.state.filterAgentCities,
                            {
                              placeholder: "Select City..",
                              onClick: this.getAgents,
                            }
                          )}
                        </CCol>
                        <CCol xs="12" md="4">
                          {this.renderSelect(
                            "agentUserId",
                            "Agent Name",
                            this.state.filterAgentIds,
                            {
                              placeholder: "Select Agent..",
                            },
                            this.state.filterAgentNames
                          )}
                        </CCol>
                      </CRow>
                    </div>
                  </div>
                  <div hidden={this.state.currentStep === 2 ? false : true}>
                    <p className="form-field-divider-title">Payment Details</p>
                    <hr className="form-field-divider-line"></hr>
                    <CRow>
                      <CCol md="6">
                        {this.renderSelect(
                          "paymentMethod",
                          "Payment Method",
                          this.state.paymentMethods,
                          {
                            placeholder: "Select Payment Method..",
                          }
                        )}
                      </CCol>
                      <CCol md="6">
                        {this.renderInput(
                          "orderCharge",
                          "Order Charge",
                          "number",
                          {
                            placeholder: "Enter Order Charge..",
                          }
                        )}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12" md="4">
                        {this.renderInput(
                          "height",
                          "Height of the Item",
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
                          "Width of the Item",
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
                          "Weight of the Item",
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
                  {this.renderButton("Place Order", "success", "danger", {
                    hidden: this.state.currentStep === 2 ? false : true,
                  })}
                  {this.renderStepButton("Next", "success", {
                    hidden: this.state.currentStep === 2 ? true : false,
                  })}
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    );
  }

  handleVisible = ({ currentTarget: input }) => {
    if (input.value === "Through Agent") {
      this.setState({ visibleAgent: true });
    } else {
      this.setState({ visibleAgent: false });
    }
  };

  async callServer() {
    this.setState({ spinner: true });
    let data = { ...this.state.data };
    if (this.state.data.orderType === "Pickup From Sender") {
      delete data.agentUserId;
      const locationId = await this.getSenderLocationId(data.pickupLocation);
      if (locationId) {
        data.pickupLocationId = locationId;
      } else {
        return;
      }
    } else {
      data.pickupLocationId = this.getLocationId(data.agentUserId);
    }
    delete data.pickupLocation;
    delete data.district;
    delete data.city;
    data.pickupTime = data.pickupTime.replace("T", " ");
    console.log(data);
    const res = await this.props.newSenderOrder(data);
    this.setState({ spinner: false });
    if (res.status === 200) {
      this.props.history.push("/my");
    } else {
      toast.error(res.message);
    }
  }
}

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({
  newSenderOrder: (data) => dispatch(thunks.order.newSenderOrder(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
