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
      thunks.order.getOrderDetailsById(props.match.params.orderId)
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
    <CContainer>
      <CRow>
        <CCol>
          <CardContainer error={error} loading={loading} header="Order Details">
            <CRow>
              <CCol>
                <CFormGroup>
                  <CLabel htmlFor="refNo">Global Order Number</CLabel>
                  <CInput id="orderNumber" readOnly value={data.refNo} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="orderNumber">Order Number</CLabel>
                  <CInput id="orderNumber" readOnly value={data.orderNumber} />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="trackingId">Tracking Number</CLabel>
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
            <CRow>
              <CCol xs="12" md="3">
                <CFormGroup>
                  <CLabel htmlFor="recipientStreet1">
                    Recipient Address Line 1
                  </CLabel>
                  <CInput
                    id="recipientStreet1"
                    readOnly
                    value={data.recipientStreet1}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="3">
                <CFormGroup>
                  <CLabel htmlFor="recipientStreet2">
                    Recipient Address Line 2
                  </CLabel>
                  <CInput
                    id="recipientStreet2"
                    readOnly
                    value={data.recipientStreet2}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="3">
                <CFormGroup>
                  <CLabel htmlFor="recipientCity">Recipient City</CLabel>
                  <CInput
                    id="recipientCity"
                    readOnly
                    value={data.recipientCity}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="3">
                <CFormGroup>
                  <CLabel htmlFor="recipientDistrict">
                    Recipient District
                  </CLabel>
                  <CInput
                    id="recipientDistrict"
                    readOnly
                    value={data.recipientDistrict}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="4">
                <CFormGroup>
                  <CLabel htmlFor="orderType">Order Type</CLabel>
                  <CInput id="orderType" readOnly value={data.orderType} />
                </CFormGroup>
              </CCol>
              <CCol
                xs="12"
                md="4"
                hidden={data.orderType === "Sender" ? true : false}
              >
                <CFormGroup>
                  <CLabel htmlFor="agentFirstName">Agent First Name</CLabel>
                  <CInput
                    id="agentFirstName"
                    readOnly
                    value={data.agentFirstName ? data.agentFirstName : ""}
                  />
                </CFormGroup>
              </CCol>
              <CCol
                xs="12"
                md="4"
                hidden={data.orderType === "Sender" ? true : false}
              >
                <CFormGroup>
                  <CLabel htmlFor="agentLastName">Agent Last Name</CLabel>
                  <CInput
                    id="agentLastName"
                    readOnly
                    value={data.agentLastName ? data.agentLastName : ""}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="3">
                <CFormGroup>
                  <CLabel htmlFor="pickupStreet1">Pickup Address Line 1</CLabel>
                  <CInput
                    id="pickupStreet1"
                    readOnly
                    value={data.pickupStreet1}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="3">
                <CFormGroup>
                  <CLabel htmlFor="pickupStreet2">Pickup Address Line 2</CLabel>
                  <CInput
                    id="pickupStreet2"
                    readOnly
                    value={data.pickupStreet2}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="3">
                <CFormGroup>
                  <CLabel htmlFor="pickupCity">Pickup City</CLabel>
                  <CInput id="pickupCity" readOnly value={data.pickupCity} />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="3">
                <CFormGroup>
                  <CLabel htmlFor="pickupDistrict">Pickup District</CLabel>
                  <CInput
                    id="pickupDistrict"
                    readOnly
                    value={data.pickupDistrict}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="paymentMethod">Payment Method</CLabel>
                  <CInput
                    id="paymentMethod"
                    readOnly
                    value={data.paymentMethod}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="paymentStatus">Payment Status</CLabel>
                  <CInput
                    id="paymentStatus"
                    readOnly
                    value={data.paymentStatus}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="4">
                <CFormGroup>
                  <CLabel htmlFor="deliveryType">Delivery Type</CLabel>
                  <CInput
                    id="deliveryType"
                    readOnly
                    value={data.deliveryType}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="4">
                <CFormGroup>
                  <CLabel htmlFor="deliveryCharge">Delivery Charge</CLabel>
                  <CInput
                    id="deliveryCharge"
                    readOnly
                    value={data.deliveryCharge}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="4">
                <CFormGroup>
                  <CLabel htmlFor="orderCharge">Order Charge</CLabel>
                  <CInput id="orderCharge" readOnly value={data.orderCharge} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="4">
                <CFormGroup>
                  <CLabel htmlFor="courierFirstName">Courier First Name</CLabel>
                  <CInput
                    id="courierFirstName"
                    readOnly
                    value={data.courierFirstName}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="4">
                <CFormGroup>
                  <CLabel htmlFor="courierLastName">Courier Last Name</CLabel>
                  <CInput
                    id="courierLastName"
                    readOnly
                    value={data.courierLastName}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="4">
                <CFormGroup>
                  <CLabel htmlFor="courierTelephone">Courier Telephone</CLabel>
                  <CInput
                    id="courierTelephone"
                    readOnly
                    value={data.courierTelephone}
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
