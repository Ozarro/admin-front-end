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
import {getAllCategories} from "../../store/product/select";

class CategoryView extends Form {
    state = {

        data: {
            name : "",
            status : "",
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

    getCategoryById = (categoryId) => {
        const category = this.props.categories.find((item) => {
            return item.categoryId == categoryId;
        });
        if (!category) {
            toast.error("Category Not found");
            return;
        }
        return category;
    };



    schema = {
        status: Joi.string().optional().label("Category Status"),
        name: Joi.string().optional().label("Name"),
        description: Joi.string().optional().label("Description"),

    };

    async componentDidMount() {
        const res = await this.props.getAllCategories();
        if (res.status === 200) {
            const category = this.getCategoryById(this.props.match.params.categoryId);
            if (category) {
                const categoryId = this.props.match.params.categoryId;
                const updateData = cleanQuery(category,
                    ["status", "name", "description"]);
                this.setState({data : {...updateData}, categoryId});
            }else{
                this.setState({ loading: false, error: true });
                toast.error("Category not found");
            }

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
                    <CCol xs="12" md="12">
                        <CCard>
                            <CCardHeader>Change Category</CCardHeader>
                            <CCardBody>
                                <CForm action="" method="post" onSubmit={this.handleSubmit}>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("name", "Category Name", "text", {
                                                placeholder: "Enter category name",
                                            }, false)}
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
                                        <CCol xs="12" md="6">
                                            {this.renderSelect(
                                                "status", "Status", this.state.status
                                            )}
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
        const data = this.state.data;
        const categoryData = cleanQuery(data, ["name", "status", "description"]);
        console.log("Call server");
        const res = await this.props.updateCategoryData(this.state.categoryId, categoryData);
        this.setState({ spinner: false });
        if (res.status === 200) {
            this.props.history.push("/admin/category/view-categories");
        } else {

            toast.error(res.message);
        }
    }
}

const mapStateToProps = (state) => ({
    categories: getAllCategories(state),
});

const mapDispatchToProps = (dispatch) => ({
    getAllCategories : () => dispatch(thunks.product.getAllCategory()),
    updateCategoryData : (categoryId, categoryData) => dispatch(thunks.product.updateCategory(categoryId,categoryData))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
