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
      name : "",
      description : "",
    },
    errors: {},
    btnDisable: false,
    spinner: false,
    error: false,
    loading: true,
  };

  schema = {
    name: Joi.string().label("Name"),
    description: Joi.string().label("Description"),
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
              header="Add Category"
            >
              <CForm onSubmit={this.handleSubmit}>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("name", "Category Name", "text", {
                      placeholder: "Enter category name",
                    })}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderTextArea("description", "Category description", "4", {
                      placeholder: "Enter category description",
                    }, true)}
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
    const categoryData = this.state.data;

    const res = await this.props.addCategory(categoryData);

    this.setState({ spinner: false });

    if (res.status === 200) {
      toast.success(res.message)
      this.props.history.push("/admin/product/view-categories");
    } else {
      if (res.status !== 200) toast.error(res.message);
    }
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  addCategory : (categoryData) => dispatch(thunks.product.addCategory(categoryData)),

});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAdd);
