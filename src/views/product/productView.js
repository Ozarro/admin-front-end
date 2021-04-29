import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CForm, CInput, CLabel,
    CRow,
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Form from "../../components/common/NewForm";
import { thunks , cleanQuery} from "../../store/index";
import {getAllCategories, getAllProducts} from "../../store/product/select";

class ProductView extends Form {
    state = {

        data: {
            pName: "",
            color: "",
            size : "",
            status : "",
            stock : "",
            price : "",
            description : "",
        },
        categories : [],
        status : ["Available" , "Not Available"],
        pCode : "",
        image : "",
        errors: {},
        btnDisable: false,
        spinner: false,
    };

    getProductBypCode = (pCode) => {
        console.log(pCode, this.props.products);
        const product = this.props.products.find((item) => {
            return item.pCode == pCode;
        });
        if (!product) {
            toast.error("Product Not found");
            return;
        }
        return product;
    };

    schema = {
        status: Joi.string().optional().label("Product Status"),
        pName: Joi.string().optional().label("Product Name"),
        color: Joi.string().optional().label("Color"),
        size: Joi.string().optional().label("Size"),
        price: Joi.number().optional().label("Price"),
        stock: Joi.number().optional().label("Stock"),
        categoryId: Joi.number().optional().label("categoryId"),
        description: Joi.string().optional().label("Description"),

    };

    async componentDidMount() {
        const res = await this.props.getAllCategories();
        const res1 = await this.props.getAllProducts();
        if (res.status === 200 && res1.status === 200) {
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

        const product = this.getProductBypCode(this.props.match.params.pCode);
        if (product) {
            const updateData = cleanQuery(product,
                ["status", "categoryId", "pName","color", "size", "price", "stock", "description"]);
            const pCode= product.pCode;
            this.setState({data : {...updateData}, pCode});
        }
    }

    componentWillUnmount() {
        toast.dismiss();
    }

    render() {
        return (
            <CContainer>
                <CRow>
                    <CCol xs="12" md="12">
                        <CCard>
                            <CCardHeader>Change Product</CCardHeader>
                            <CCardBody>
                                <CForm action="" method="post" onSubmit={this.handleSubmit}>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            <CLabel htmlFor="name">Product Code</CLabel>
                                            <CInput id="name" readOnly value={this.state.pCode} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("pName", "Product Name", "text", {
                                                placeholder: "Enter product name",
                                            }, false)}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("color", "Product Color", "text", {
                                                placeholder: "Enter product color",
                                            }, false)}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("size", "Product Size", "text", {
                                                placeholder: "Enter product size",
                                            },false)}
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
                                            },false)}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("price", "Product Price", "text", {
                                                placeholder: "Enter product price",
                                            },false)}
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
                                            {this.renderSelect(
                                                "status", "Status", this.state.status
                                            )}
                                        </CCol>
                                    </CRow>

                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderImageInput("image", "Product Image", "file", {
                                                placeholder: "Upload product image",
                                            },false)}
                                        </CCol>
                                    </CRow>
                                    {this.renderButton("Submit", "primary", "danger")}

                                </CForm>
                            </CCardBody>
                        </CCard>
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
            "color",
            this.state.data.color
        );
        formData.append(
            "pName",
            this.state.data.pName
        );
        formData.append(
            "status",
            this.state.data.status
        )
        formData.append(
            "size",
            this.state.data.size
        )
        formData.append(
            "description",
            this.state.data.description
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
            "categoryId",
            this.state.data.categoryId
        )
        console.log("state", this.state);
        console.log("formData",formData);

        console.log("Props", this.props);

        const res = await this.props.updateProduct(this.state.pCode, formData);
        console.log("PRoduct reposnes", res);
        this.setState({ spinner: false });
        if (res.status === 200) {
            this.props.history.push("/admin/product/view-products");
        } else {

            toast.error(res.message);
        }
    }
}

const mapStateToProps = (state) => ({
    products : getAllProducts(state),
    categories: getAllCategories(state),
});

const mapDispatchToProps = (dispatch) => ({
    getAllProducts : () => dispatch(thunks.product.getAllProducts()) ,
    getAllCategories : () => dispatch(thunks.product.getAllCategory()),
    updateProduct : (pCode, productData) => dispatch(thunks.product.updateProduct(pCode,productData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);
