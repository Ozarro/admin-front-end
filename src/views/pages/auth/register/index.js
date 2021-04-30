import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../api/index";
import "../../../../assets/local-css/auth.css";
import Form from "../../../../components/common/NewForm";
import _ from "lodash";

class Register extends Form {
  state = {
    data: {
      password : "",
      confirmPassword: "",
      name: "",
      email: "",
      mobile: ""
    },
    errors: {},
    btnDisable: false,
    spinner: false
  };

  /**
   * Schema for joi validation
   */
  schema = {
    name: Joi.string().label("Name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    mobile: Joi.string().min(10).max(13).required().label("Mobile Number"),
    password: Joi.string().min(6).required().label("Password"),
    confirmPassword: Joi.string()
      .custom(this.comparePassword())
      .required()
      .label("Confrim Password")
      .messages({
        "any.invalid": "Repeat password does not match with the above password",
      }),
  };

    comparePassword() {
    return (value, helper) => {
      if (value !== this.state.data.password) {
        return helper.error("any.invalid");
      }
      return value;
    };
  }

  componentWillUnmount() {
    toast.dismiss();
  }

  render() {
    return (
      <React.Fragment>
        <CContainer fluid >
          <CRow className="justify-content-center">
            <CCol md="7"></CCol>
            <CCol md="4">
              <CCard
                className=""
                style={{
                  marginTop: `${
                    this.state.currentStep === 1
                      ? this.state.userAccountType === "Business"
                        ? `15px`
                        : `50px`
                      : `200px`
                  }`,
                }}
              >
                <CCardBody className="p-4">
                  <CForm onSubmit={this.handleSubmit}>
                    <h3>Register</h3>
                    <p className="text-muted">Create your account</p>
                    <div >
                      {this.renderInputGroup(
                        "name",
                        "text",
                        "Name",
                        "cil-user"
                      )}
                      {this.renderInputGroup(
                        "mobile",
                        "text",
                        "Mobile Number",
                        "cil-mobile"
                      )}
                      {this.renderInputGroup(
                        "email",
                        "text",
                        "Email",
                        "cil-at"
                      )}
                      {this.renderInputGroup(
                        "password",
                        "password",
                        "Password",
                        "cil-lock-locked"
                      )}
                      {this.renderInputGroup(
                        "confirmPassword",
                        "password",
                        "Confirm Password",
                        "cil-lock-locked"
                      )}
                    </div>
                    {this.renderButton("Create Account", "success", "danger", {
                      style: { width: "100%" }
                    })}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </React.Fragment>
    );
  }

  async callServer() {
    this.setState({ spinner: true });

    const inputData = { ...this.state.data };
    delete inputData.confirmPassword;
    let res, data;
    const filteredData = _.pick(inputData, [
      "name",
      "mobile",
      "email",
      "password"
    ]);
    [res, data] = await api.user.add.admin(filteredData);

    this.setState({ spinner: false });

    if (res.status === 200) {
      toast.success("Registration successful, admin will verify your account soon.");
        this.props.history.push("/admin/auth/login")
    } else {
      toast.error(res.message);
    }
  }
}

export default Register;
