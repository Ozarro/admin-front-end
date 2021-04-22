import {
  CButton,
  CCol,
  CContainer,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CardContainer from "../../components/common/CardContainer";
import { thunks } from "../../store";
import { getProfileData } from "../../store/user/select";

const SenderProfile = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const data = useSelector(getProfileData);

  useEffect(async () => {
    setLoading(true);
    const res = await dispatch(thunks.user.getProfileDetails());
    setLoading(false);
    if (res && res.status !== 200) {
      setError(true);
      toast.error(res.message);
    }
  }, []);

  useEffect(() => {
    return () => toast.dismiss();
  }, []);

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CardContainer error={error} loading={loading} header="My Profile">
            <CRow>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="firstName">First Name</CLabel>
                  <CInput id="firstName" readOnly value={data.firstName} />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="lastName">Last Name</CLabel>
                  <CInput id="lastName" readOnly value={data.lastName} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="telephone">Contact Number</CLabel>
                  <CInput id="telephone" readOnly value={data.telephone} />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="businessName">Business Name</CLabel>
                  <CInput
                    id="businessName"
                    readOnly
                    value={data.businessName}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="3">
                <CFormGroup>
                  <CLabel htmlFor="district">Address District</CLabel>
                  <CInput id="district" readOnly value={data.district} />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="3">
                <CFormGroup>
                  <CLabel htmlFor="city">Address City</CLabel>
                  <CInput id="city" readOnly value={data.city} />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="3">
                <CFormGroup>
                  <CLabel htmlFor="street1">Address Line 1</CLabel>
                  <CInput id="street1" readOnly value={data.street1} />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="3">
                <CFormGroup>
                  <CLabel htmlFor="street2">Address Line 2</CLabel>
                  <CInput id="street2" readOnly value={data.street2} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="paymentMethod">
                    Cash on Delivery payment frequency
                  </CLabel>
                  <CInput
                    id="paymentMethod"
                    readOnly
                    value={data.paymentMethod}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CContainer>
              <CRow>
                <CButton color="primary" className="mr-2" to="/my/profile/edit">
                  Edit
                </CButton>
                <CButton color="danger" to="/my/change-password">
                  Change Password
                </CButton>
              </CRow>
            </CContainer>
          </CardContainer>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default SenderProfile;
