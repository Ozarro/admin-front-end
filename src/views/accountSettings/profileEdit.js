import {
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend, CInputGroupText, CInvalidFeedback,
  CLabel,
  CRow
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardContainer from "../../components/common/CardContainer";
import Form from "../../components/common/NewForm";
import { thunks } from "../../store/index";
import { getProfileData } from "../../store/user/select";
import CIcon from "@coreui/icons-react";

class ProfileEdit extends Form {
  state = {
    data: {
      name : "",
      mobile : ""
    },
    image : "",
    errors: {},
    btnDisable: false,
    spinner: false,
    error: false,
    loading: true,
  };

  schema = {
    name: Joi.string().label("Name"),
    userType: Joi.string().label("User Type"),
    mobile: Joi.string().min(9).max(13).required().label("Mobile Number")
  };

  async componentDidMount() {
    //dispatch the event to get the district and cities
    //set to the local states
    const res = await this.props.getProfileDetails();
    if (res.status === 200) {
      const temp = { ...this.props.profileData };
      const data = {
        name : temp.name,
        mobile : temp.mobile,
        userType : temp.userType
      }
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
                    {this.renderInput("name", "Name", "text", {
                      placeholder: "Enter Your Name",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("mobile", "Mobile Number", "text", {
                      placeholder: "Enter Your Mobile Number",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="userType">Admin Type</CLabel>
                    <CInput id="userType" readOnly value={this.state.data.userType} />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderImageInput("image", "Profile Picture", "file", {
                      placeholder: "Upload your profile picture",
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

    const formData = new FormData();
    // Update the formData object
    formData.append(
        "image",
        this.state.image,
    );
    formData.append(
        "name",
        this.state.data.name
    )
    formData.append(
        "mobile",
        this.state.data.mobile
    )

    const res1 = await this.props.updateProfileDetails(formData);
    this.setState({ spinner: false });
    if (res1.status === 200) {
      toast.success(res1.message)
      this.props.history.push("/admin/profile");
    } else {
      if (res1.status !== 200) toast.error(res1.message);
    }
  }
}

const mapStateToProps = (state) => ({
  profileData: getProfileData(state),
});

const mapDispatchToProps = (dispatch) => ({
  getProfileDetails: () => dispatch(thunks.user.getProfileDetails()),
  updateProfileDetails: (profileData) =>
    dispatch(thunks.user.updateAdminProfile(profileData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
