import React from "react";
import { CProgress, CButton } from "@coreui/react";
import { useEffect, useState } from "react";
import CIcon from "@coreui/icons-react";
import "../../assets/local-css/step-progress-bar.css";

function StepProgress({ step, onBackBtnClick, show, numOfSteps }) {
  let [steps, setSteps] = useState([]);

  useEffect(() => {
    const steps = [];

    for (let i = 0; i < numOfSteps; i++) {
      steps.push(i + 1);
    }

    setSteps(steps);
  }, []);

  return (
    <div className="step-container" hidden={!show}>
      <div hidden={step === 1 ? true : false}>
        <CButton
          className="step-back-btn"
          color="primary"
          variant="outline"
          onClick={onBackBtnClick}
        >
          <CIcon name="cil-arrow-left" size="xl" />
        </CButton>
      </div>
      <div className="step-pro-container">
        <div className="steps">
          {steps.map((value) => (
            <div
              key={value}
              className={`step-indicator ${value < step ? `step-active` : ``}`}
            >
              {value}
            </div>
          ))}
        </div>
        <div className="step-progress-bar">
          <CProgress
            color="success"
            value={100 * ((step - 1) / (numOfSteps - 1))}
            className="bg-secondary"
          />
        </div>
      </div>
    </div>
  );
}

export default StepProgress;
