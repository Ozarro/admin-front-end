import {
  CButton,
  CCol,
  CContainer,
  CFormGroup, CImg,
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
import {BACK_END_URL} from "../../api/index";

const AVATAR_URL = BACK_END_URL.DEFAULT_FILE_URL;

const Profile = (props) => {
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
                <div className="c-avatar-xl mb-4">
                  <CImg
                      src={AVATAR_URL+data.image}
                      className="c-avatar-xl"
                      alt="admin@bootstrapmaster.com"
                  />
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="name">Admin Name</CLabel>
                  <CInput id="name" readOnly value={data.name} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="name">Admin Email</CLabel>
                  <CInput id="email" readOnly value={data.email} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="name">Admin Type</CLabel>
                  <CInput id="userType" readOnly value={data.userType} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="mobile">Mobile Number</CLabel>
                  <CInput id="mobile" readOnly value={data.mobile} />
                </CFormGroup>
              </CCol>
            </CRow>
            
            <CContainer>
              <CRow>
                <CButton color="primary" className="mr-2" to="/admin/profile/edit">
                  Edit
                </CButton>
                <CButton color="danger" to="/admin/change-password">
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

export default Profile;
