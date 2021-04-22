import CIcon from "@coreui/icons-react";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CSpinner,
} from "@coreui/react";
import React from "react";

const CardContainer = (props) => {
  return (
    <CCard>
      <CCardHeader>{props.header}</CCardHeader>
      <CCardBody>
        {props.loading ? (
          <div className="mt-5 d-flex justify-content-center mb-5">
            <CSpinner color="info" />
          </div>
        ) : props.error ? (
          <div className="mt-5 d-flex inline-block justify-content-center mb-5">
            <p style={{ fontSize: "20px" }} className="mr-2">
              No Data
            </p>
            <CIcon
              size="xl"
              style={{ color: "orange" }}
              className="ml-2"
              name="cil-warning"
              className="mfe-2"
            />
          </div>
        ) : (
          props.children
        )}
      </CCardBody>
      <CCardFooter>{props.footer}</CCardFooter>
    </CCard>
  );
};

export default CardContainer;
