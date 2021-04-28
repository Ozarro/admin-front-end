import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CForm,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CRow,
} from "@coreui/react";
import { Email } from "@material-ui/icons";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../../../../assets/local-css/auth.css";
import Form from "../../../../components/common/NewForm";
import { thunks } from "../../../../store/index";
import {
  getAccessToken,
  getRefreshToken,
  getUserId,
} from "../../../../store/user/select";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
    btnDisable: false,
    spinner: false,
    rememberMe: true,
  };

  schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().required().label("Password"),
  };

  componentDidMount() {
    if (this.props.currentUserId != "") {
      this.props.history.push("/admin");
    }
  }

  componentWillUnmount() {
    toast.dismiss();
  }

  render() {
    return (
      <React.Fragment>
        <CRow className="justify-content-center">
          <CCol md="6"></CCol>
          <CCol md="4">
            <CCardGroup className="ml-4 mr-4" style={{ marginTop: "150px" }}>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    {this.renderInputGroup(
                      "email",
                      "text",
                      "Email",
                      "cil-user"
                    )}
                    {this.renderInputGroup(
                      "password",
                      "password",
                      "Password",
                      "cil-lock-locked"
                    )}
                    <CFormGroup variant="checkbox" className="checkbox mb-2">
                      <CInputCheckbox
                        id="rememberMe"
                        name="rememberMe"
                        onChange={this.handleChangeCheckBox}
                        checked={this.state.rememberMe}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="rememberMe"
                      >
                        Remember Me
                      </CLabel>
                    </CFormGroup>
                    <CRow>
                      <CCol xs="6">
                        {this.renderButton("Log In", "success", "danger")}
                      </CCol>
                      <CCol xs="6" className="text-right">
                        {/* <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton> */}
                      </CCol>
                    </CRow>
                    <CRow className="text-center justify-content-center mt-2">
                      <div>
                        <p style={{ fontWeight: "bold" }}>
                          If you are not a user already, please register to
                          Ozarro Clothing.
                        </p>
                        <Link to="/admin/auth/register">
                          <CButton color="primary" className="mt-1">
                            Register Now!
                          </CButton>
                        </Link>
                      </div>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </React.Fragment>
    );
  }

  handleChangeCheckBox = () => {
    const bool = this.state.rememberMe;
    this.setState({ rememberMe: !bool });
  };

  async callServer() {
    this.setState({ spinner: true });

    // thunks.user.adminLogin is attached by mapDispatchtoProps
    const res = await this.props.adminLogin(
      this.state.data.email,
      this.state.data.password
    );
    console.log(res);

    this.setState({ spinner: false });

    if (res.status === 200) {
      if (this.state.rememberMe) {
        localStorage.setItem("ozarro-access-token", this.props.accessToken);
        localStorage.setItem("ozarro-refresh-token", this.props.refreshToken);
      }
      if (this.props.location.state) {
        this.props.history.push(this.props.location.state.from.pathname);
      } else {
        this.props.history.push("/admin");
      }
    } else {
      toast.error(res.message);
    }
  }
}

/**
 * Attach state and dispatch to props
 * @param {*} state 
 * @returns 
 */
const mapStateToProps = (state) => ({
  accessToken: getAccessToken(state),
  refreshToken: getRefreshToken(state),
  currentUserId: getUserId(state),
});

const mapDispatchToProps = (dispatch) => ({
  adminLogin: (email, password) =>
    dispatch(thunks.user.adminLogin(email, password)),
});

/**
 * Connect states and dispatch
 */
export default connect(mapStateToProps, mapDispatchToProps)(Login);
