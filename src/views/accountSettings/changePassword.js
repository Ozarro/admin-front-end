import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CRow,
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Form from "../../components/common/NewForm";
import { thunks } from "../../store/index";

class ChangePassword extends Form {
  state = {
    data: {
      currentPassword: "",
      password: "",
      repeatNewPassword: "",
    },
    errors: {},
    btnDisable: false,
    spinner: false,
  };

  schema = {
    currentPassword: Joi.string().required().label("Current Password"),
    password: Joi.string().required().label("New Password"),
    repeatNewPassword: Joi.string()
      .custom(this.comparePassword())
      .required()
      .label("Repeat New Password")
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
      <CContainer>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>Change Password</CCardHeader>
              <CCardBody>
                <CForm onSubmit={this.handleSubmit}>
                  <CRow>
                    <CCol>
                      {this.renderInput(
                        "currentPassword",
                        "Current Password",
                        "password",
                        {
                          placeholder: "Enter Your Current Password",
                        }
                      )}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      {this.renderInput(
                        "password",
                        "New Password",
                        "password",
                        {
                          placeholder: "Enter Your New Password",
                        }
                      )}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      {this.renderInput(
                        "repeatNewPassword",
                        "Repeat New Password",
                        "password",
                        {
                          placeholder: "Repeat New Password",
                        }
                      )}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      {this.renderButton("Change", "danger", "light")}
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
              <CCardFooter></CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    );
  }

  async callServer() {
    this.setState({ spinner: true });
    const data = { ...this.state.data };
    delete data.repeatNewPassword;
    const res = await this.props.changePassword(data);
    this.setState({ spinner: false });
    if (res.status === 200) {
      this.props.history.push("/admin/profile");
    } else {
      toast.error(res.message);
    }
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  changePassword: (data) => dispatch(thunks.user.changeAdminPassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
