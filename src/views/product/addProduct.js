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
import {getAllCategories} from "../../store/product/select";
import CIcon from "@coreui/icons-react";

class ProductAdd extends Form {
  state = {
    data: {
      pCode : "",
      categoryId : "",
      pName : "",
      color : "",
      size : "",
      stock : "",
      price : "",
      description : "",
    },
    image : "",
    categories : [],
    errors: {},
    btnDisable: false,
    spinner: false,
    error: false,
    loading: true,
  };

  schema = {
    pCode: Joi.string().label("Product Code"),
    pName: Joi.string().label("Product Name"),
    categoryId: Joi.number().label("Category Id"),
    stock: Joi.number().label("Stock"),
    price: Joi.number().label("Price"),
    color: Joi.string().label("Color"),
    size: Joi.string().label("Size"),
    description: Joi.string().label("Description"),
    status: Joi.string().label("Available"),
  };

  async componentDidMount() {
    //dispatch the event to get the categories
    //set to the local states
    const res = await this.props.getAllCategories();
    if (res.status === 200) {
      const categoriesData = this.props.categories;
      let pairValue = [];
      categoriesData.forEach(
          (item, index) => {
            pairValue.push({
              value : item.categoryId,
              label : item.name
            })
          }
      )
      this.setState({ categories:pairValue,loading: false });
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
              header="Add Product"
            >
              <CForm onSubmit={this.handleSubmit}>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("pCode", "Product Code", "text", {
                      placeholder: "Enter product code",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("pName", "Product Name", "text", {
                      placeholder: "Enter product name",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("color", "Product Color", "text", {
                      placeholder: "Enter product color",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("size", "Product Size", "text", {
                      placeholder: "Enter product size",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderTextArea("description", "Product description", "4", {
                      placeholder: "Enter product description",
                    }, true)}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("stock", "Stock", "text", {
                      placeholder: "Enter product stock",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("price", "Product Price", "text", {
                      placeholder: "Enter product price",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderSelectWithLabelValue(
                        "categoryId", "Category Name", this.state.categories
                    )}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderImageInput("image", "Product Image", "file", {
                      placeholder: "Upload product image",
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
        this.state.image
    );
    formData.append(
        "pCode",
        this.state.data.pCode
    )
    formData.append(
        "pName",
        this.state.data.pName
    )
    formData.append(
        "color",
        this.state.data.color
    )
    formData.append(
        "size",
        this.state.data.size
    )
    formData.append(
        "categoryId",
        this.state.data.categoryId
    )
    formData.append(
        "stock",
        this.state.data.stock
    )
    formData.append(
        "price",
        this.state.data.price
    )
    formData.append(
        "description",
        this.state.data.description
    )
    formData.append(
        "status",
        "Available"
    )

    const res = await this.props.addProduct(formData);

    this.setState({ spinner: false });

    if (res.status === 200) {
      toast.success(res.message)
      this.props.history.push("/admin/product");
    } else {
      if (res.status !== 200) toast.error(res.message);
    }
  }
}

const mapStateToProps = (state) => ({
  categories: getAllCategories(state),
});

const mapDispatchToProps = (dispatch) => ({
  getAllCategories : () => dispatch(thunks.product.getAllCategory()),
  addProduct : (productData) => dispatch(thunks.product.addProduct(productData))

});

export default connect(mapStateToProps, mapDispatchToProps)(ProductAdd);
