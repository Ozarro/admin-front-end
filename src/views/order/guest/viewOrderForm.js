import {
  CCol,
  CContainer,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CTextarea,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CardContainer from "../../../components/common/CardContainer";
import { thunks } from "../../../store";
import { selectInDetailOrder } from "../../../store/order/select";

const ViewOrderForm = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const data = useSelector(selectInDetailOrder);

  useEffect(async () => {
    setLoading(true);
    const res = await dispatch(
      thunks.order.trackOrderDetailsById(props.match.params.trackingId)
    );
    setLoading(false);
    if (res.status !== 200) {
      setError(true);
      toast.error(res.message);
    }
  }, []);

  const getCreateDate = () => {
    if (data.createdAt) {
      const dateTime = data.createdAt;
      const [date, val] = dateTime.split("T");
      return date;
    }
  };

  const getCreateTime = () => {
    if (data.createdAt) {
      const dateTime = data.createdAt;
      const [date, val] = dateTime.split("T");
      const [time, x] = val.split(".");
      return time;
    }
  };

  return (
    <CContainer style={{ marginTop: "100px" }}>
      <CRow>
        <CCol>
          <CardContainer error={error} loading={loading} header="Order Details">
            <CRow>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="orderNumber">Order Number</CLabel>
                  <CInput id="orderNumber" readOnly value={data.orderNumber} />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="trackingId">Order Number</CLabel>
                  <CInput id="trackingId" readOnly value={data.trackingId} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormGroup>
                  <CLabel htmlFor="description">Item Description</CLabel>
                  <CTextarea
                    id="description"
                    readOnly
                    value={data.description}
                    rows="6"
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="6" md="3">
                <CFormGroup>
                  <CLabel htmlFor="createDate">Created Date</CLabel>
                  <CInput id="createDate" readOnly value={getCreateDate()} />
                </CFormGroup>
              </CCol>
              <CCol xs="6" md="3">
                <CFormGroup>
                  <CLabel htmlFor="createTime">Created Time</CLabel>
                  <CInput id="createTime" readOnly value={getCreateTime()} />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="status">Status</CLabel>
                  <CInput id="status" readOnly value={data.status} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="4">
                <CFormGroup>
                  <CLabel htmlFor="recipientName">Recipient Name</CLabel>
                  <CInput
                    id="recipientName"
                    readOnly
                    value={data.recipientName}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="4">
                <CFormGroup>
                  <CLabel htmlFor="recipientTelephone">
                    Recipient Contact Number
                  </CLabel>
                  <CInput
                    id="recipientTelephone"
                    readOnly
                    value={data.recipientTelephone}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="4">
                <CFormGroup>
                  <CLabel htmlFor="recipientEmail">Recipient Email</CLabel>
                  <CInput
                    id="recipientEmail"
                    readOnly
                    value={data.recipientEmail}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
          </CardContainer>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ViewOrderForm;
