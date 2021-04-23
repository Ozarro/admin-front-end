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
import Form from "../../../components/common/NewForm";
import { thunks } from "../../../store/index";
import {getAllAdmins} from "../../../store/user/select";

class AdminView extends Form {
    state = {
        data: {
            name: "",
            mobile: "",
            email : "",
            status : "",
            userType : "",
            userId : ""
        },
        userId : "",
        errors: {},
        btnDisable: false,
        spinner: false,
    };

    getAdminById = (userId) => {
        const admin = this.props.admins.find((item) => {
            return item.userId == userId;
        });
        if (!admin) {
            toast.error("User Not found");
            return;
        }
        return admin;
    };



    schema = {
        status: Joi.string().optional().label("Status"),
        name: Joi.string().optional().label("Name"),
        mobile: Joi.string().optional().label("Mobile Number"),
        userType: Joi.string().optional().label("Admin Type"),
        userId: Joi.number().optional().label("User Id"),

    };

    async componentDidMount() {
        const admin = this.getAdminById(this.props.match.params.userId);
        if (admin) {
            this.setState({userId : this.props.match.params.userId})
            console.log(admin);
            const temp = {
                userId : admin.userId,
                name : admin.name,
                mobile : admin.mobile,
                userType : admin.userType,
                status : ""
            }
            if(admin.status) {
                temp.status = "Active"
            } else{
                temp.status = "Deactivated"
            }
            this.setState({data : {...temp}});
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
                            <CCardHeader>Change Admin Account Status</CCardHeader>
                            <CCardBody>
                                <CForm action="" method="post" onSubmit={this.handleSubmit}>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            <CLabel htmlFor="name">Name</CLabel>
                                            <CInput id="name" readOnly value={this.state.data.name} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            <CLabel htmlFor="name">Admin Type</CLabel>
                                            <CInput id="userType" readOnly value={this.state.data.userType} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            <CLabel htmlFor="mobile">Mobile Number</CLabel>
                                            <CInput id="mobile" readOnly value={this.state.data.mobile} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderSelect(
                                                "status",
                                                "Account Status",
                                                ["Active", "Deactivated"],{
                                                    placeholder : "Select Status"
                                                }
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
        let status ;
        if(this.state.data.status === "Active"){
            status = true;
        }else{
            status = false;
        }
        console.log(this.state);
        const res = await this.props.updateAdminStatus(parseInt(this.state.userId), status);
        this.setState({ spinner: false });
        if (res.status === 200) {
            this.props.history.push("/admin/view-admins");
        } else {

            toast.error(res.message);
        }
    }
}

const mapStateToProps = (state) => ({
    admins : getAllAdmins(state)
});

const mapDispatchToProps = (dispatch) => ({
    getAllAdmins : () => dispatch(thunks.user.getAllAdmins()) ,
    updateAdminStatus : (userId, status) => dispatch(thunks.user.updateAdminStatus(userId, status))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminView);
