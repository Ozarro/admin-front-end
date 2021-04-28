import CIcon from "@coreui/icons-react";
import {
  CButton,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInvalidFeedback,
  CLabel,
  CSelect,
  CSpinner,
  CTextarea,
  CInputRadio,
  CCol,
} from "@coreui/react";
import Joi from "joi";
import _ from "lodash";
import { Component } from "react";

/**
 * Custom  Form for easy validation and state managment
 */
class Form extends Component {
  state = {
    data: {},
    image : "",
    errors: {},
    btnDisable: false,
    spinner: false,
    currentStep: 1,
    stepAtr: [],
  };
  // ON submit call this function
  handleSubmit = (e) => {
    e.preventDefault();
    const error = this.validate();
    console.log("These are submit errors",error);
    if (!error) {
      this.callServer();
    } else {
      const btnDisable = true;
      const errors = error;
      this.setState({ errors, btnDisable });
    }
  };

  handleStepBtnClick = (e) => {
    e.preventDefault();
    const error = this.validateStep();
    if (!error) {
      const currentStep = this.state.currentStep + 1;
      const stepAtr = this.getStepAtr(currentStep);
      this.setState({ currentStep, stepAtr });
    } else {
      const btnDisable = true;
      const errors = error;
      this.setState({ errors, btnDisable });
    }
  };

  validate = () => {
    const result = Joi.object(this.schema)
      .options({ abortEarly: false })
      .validate(this.state.data);
    if (result.error) {
      const errors = {};
      result.error.details.map((each) => {
        _.set(
          errors,
          _.join(each.path, "."),
          each.message.replace('"', "").replace('"', "")
        );
      });
      return errors;
    }
    return null;
  };

  validateStep = () => {
    const tempSchema = _.pick(this.schema, this.state.stepAtr);
    const tempData = _.pick(this.state.data, this.state.stepAtr);
    const result = Joi.object(tempSchema)
      .options({ abortEarly: false })
      .validate(tempData);
    if (result.error) {
      const errors = {};
      result.error.details.map((each) => {
        _.set(
          errors,
          _.join(each.path, "."),
          each.message.replace('"', "").replace('"', "")
        );
      });
      return errors;
    }
    return null;
  };

  handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    const data = { ...this.state.data };
    data[name] = value;
    const error = this.validateProperty(name, value);
    const errors = { ...this.state.errors };
    error ? (errors[name] = error) : delete errors[name];
    let btnDisable = true;
    if (Object.keys(errors).length === 0) {
      btnDisable = false;
    }
    this.setState({ data, errors, btnDisable });
  };

  // On file select (from the pop up)
  onFileChange = event => {
    // Update the state
    this.setState({ image: event.target.files[0] });

  };


  validateProperty = (name, value) => {
    const schema = {
      [name]: this.schema[name],
    };
    const data = { [name]: value };
    const result = Joi.object(schema).validate(data);
    return result.error
      ? result.error.details[0].message.replace('"', "").replace('"', "")
      : null;
  };

  getCreateDate = (dateTime) => {
    if (dateTime) {
      const [date, val] = dateTime.split("T");
      return date;
    }
  };

  renderInput = (
    name,
    label,
    type,
    others = {},
    notRequired = false,
    hidden = false
  ) => {
    const { data, errors } = this.state;
    return (
      <CFormGroup hidden={hidden}>
        <CLabel htmlFor={name}>
          {label}{" "}
          <span hidden={notRequired} style={{ color: "red" }}>
            *
          </span>
        </CLabel>
        <CInput
          type={type}
          id={name}
          name={name}
          onChange={this.handleChange}
          value={data[name]}
          invalid={errors[name] ? true : false}
          {...others}
        />
        <CInvalidFeedback>{errors[name]}</CInvalidFeedback>
      </CFormGroup>
    );
  };

  renderDateInput = (
      name,
      label,
      type,
      others = {},
      notRequired = false,
      hidden = false
  ) => {
    const { data, errors } = this.state;
    return (
        <CFormGroup hidden={hidden}>
          <CLabel htmlFor={name}>
            {label}{" "}
            <span hidden={notRequired} style={{ color: "red" }}>
            *
          </span>
          </CLabel>
          <CInput
              type={type}
              id={name}
              name={name}
              onChange={this.handleChange}
              value={this.getCreateDate(data[name])}
              invalid={errors[name] ? true : false}
              {...others}
          />
          <CInvalidFeedback>{errors[name]}</CInvalidFeedback>
        </CFormGroup>
    );
  };

  renderImageInput = (
      name,
      label,
      type,
      others = {},
      notRequired = false,
      hidden = false
  ) => {
    const { data, errors } = this.state;
    return (
        <CFormGroup hidden={hidden}>
          <CLabel htmlFor={name}>
            {label}{" "}
            <span hidden={notRequired} style={{ color: "red" }}>
            *
          </span>
          </CLabel>
          <CInput
              type={type}
              id={name}
              name={name}
              onChange={this.onFileChange}
              value={data[name]}
              invalid={errors[name] ? true : false}
              {...others}
          />
          <CInvalidFeedback>{errors[name]}</CInvalidFeedback>
        </CFormGroup>
    );
  };

  renderInputGroup = (
    name,
    type,
    placeholder,
    iconName,
    others = {},
    notRequired = false,
    hidden = false
  ) => {
    const { data, errors } = this.state;
    return (
      <CFormGroup hidden={hidden} className="mb-3">
        <CInputGroup>
          <CInputGroupPrepend>
            <CInputGroupText>
              <CIcon name={iconName} />
            </CInputGroupText>
          </CInputGroupPrepend>
          <CInput
            type={type}
            id={name}
            name={name}
            onChange={this.handleChange}
            value={data[name]}
            invalid={errors[name] ? true : false}
            placeholder={notRequired ? placeholder : `${placeholder} *`}
            {...others}
          />
          <CInvalidFeedback>{errors[name]}</CInvalidFeedback>
        </CInputGroup>
      </CFormGroup>
    );
  };

  renderSelectGroup = (
    name,
    placeholder,
    iconName,
    options,
    others = {},
    notRequired = false,
    hidden = false
  ) => {
    const { data, errors } = this.state;
    return (
      <CFormGroup hidden={hidden} className="mb-3">
        <CInputGroup>
          <CInputGroupPrepend>
            <CInputGroupText>
              <CIcon name={iconName} />
            </CInputGroupText>
          </CInputGroupPrepend>
          <CSelect
            custom
            name={name}
            id={name}
            value={data[name]}
            onChange={this.handleChange}
            invalid={errors[name] ? true : false}
            defaultValue={""}
            {...others}
          >
            <option value="" disabled hidden>
              {notRequired ? placeholder : `${placeholder} *`}
            </option>
            {options
              ? options.map((option, index) => {
                  return (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  );
                })
              : ""}
          </CSelect>
          <CInvalidFeedback>{errors[name]}</CInvalidFeedback>
        </CInputGroup>
      </CFormGroup>
    );
  };

  renderSelect = (
    name,
    label,
    options,
    others = {},
    displayNames = [],
    notRequired = false,
    hidden = false
  ) => {
    const { data, errors } = this.state;
    return (
      <CFormGroup hidden={hidden}>
        <CLabel htmlFor={name}>
          {label}{" "}
          <span hidden={notRequired} style={{ color: "red" }}>
            *
          </span>
        </CLabel>
        <CSelect
          custom
          name={name}
          id={name}
          value={data[name]}
          onChange={this.handleChange}
          invalid={errors[name] ? true : false}
          {...others}
        >
          <option value="" disabled hidden>
            Choose here..
          </option>
          {options
            ? options.map((option, index) => {

                return (
                  <option key={index} value={option}>
                    {displayNames[index] ? displayNames[index] : option}
                  </option>
                );
              })
            : ""}
        </CSelect>
        <CInvalidFeedback>{errors[name]}</CInvalidFeedback>
      </CFormGroup>
    );
  };

  renderSelectWithLabelValue = (
      name,
      label,
      options,
      others = {},
      displayNames = [],
      notRequired = false,
      hidden = false
  ) => {
    const { data, errors } = this.state;
    return (
        <CFormGroup hidden={hidden}>
          <CLabel htmlFor={name}>
            {label}{" "}
            <span hidden={notRequired} style={{ color: "red" }}>
            *
          </span>
          </CLabel>
          <CSelect
              custom
              name={name}
              id={name}
              value={data[name]}
              onChange={this.handleChange}
              invalid={errors[name] ? true : false}
              {...others}
          >

            <option value="" disabled hidden>
              Choose here..
            </option>
            {options.map((item, index) => {
                  return (
                      <option key={index} value={item.value}>
                        {item.label ? item.label : item}
                      </option>
                  );
                })
                }
          </CSelect>
          <CInvalidFeedback>{errors[name]}</CInvalidFeedback>
        </CFormGroup>
    );
  };

  renderTextArea(
    name,
    label,
    rows,
    others = {},
    notRequired = false,
    hidden = false
  ) {
    const { data, errors } = this.state;
    return (
      <CFormGroup hidden={hidden}>
        <CLabel htmlFor={name}>
          {label}{" "}
          <span hidden={notRequired} style={{ color: "red" }}>
            *
          </span>
        </CLabel>
        <CTextarea
          rows={rows}
          id={name}
          name={name}
          onChange={this.handleChange}
          value={data[name]}
          invalid={errors[name] ? true : false}
          {...others}
        />
        <CInvalidFeedback>{errors[name]}</CInvalidFeedback>
      </CFormGroup>
    );
  }

  renderRadioGroup(
    label,
    name,
    options,
    values,
    others = {},
    notRequired = false,
    hidden = false
  ) {
    const { data, errors } = this.state;
    return (
      <CFormGroup hidden={hidden} row>
        <CCol md="3">
          <CLabel>
            {label}{" "}
            <span hidden={notRequired} style={{ color: "red" }}>
              *
            </span>
          </CLabel>
        </CCol>
        <CCol md="9">
          {options.map((value, index) => {
            return (
              <CFormGroup variant="checkbox" key={index}>
                <CInputRadio
                  className="form-check-input"
                  id={`radio${index + 1}`}
                  name={name}
                  value={values[index]}
                  {...others}
                  invalid={errors[name] ? true : false}
                  onChange={this.handleChange}
                  selected={data[name] === value ? true : false}
                />
                <CLabel variant="checkbox" htmlFor={`radio${index + 1}`}>
                  {value}
                </CLabel>
              </CFormGroup>
            );
          })}
        </CCol>
        <CInvalidFeedback>{errors[name]}</CInvalidFeedback>
      </CFormGroup>
    );
  }

  renderButton = (label, btnColor, spinnerColor, others = {}) => {
    return (
      <CButton
        disabled={this.state.btnDisable && (this.validate() ? true : false)}
        type="submit"
        color={this.state.btnDisable ? "secondary" : btnColor}
        {...others}
      >
        <CSpinner hidden={!this.state.spinner} color={spinnerColor} size="sm" />{" "}
        {label}
      </CButton>
    );
  };

  renderStepButton = (label, btnColor, others = {}) => {
    return (
      <CButton
        disabled={this.state.btnDisable && (this.validateStep() ? true : false)}
        type="button"
        color={this.state.btnDisable ? "secondary" : btnColor}
        {...others}
        onClick={this.handleStepBtnClick}
      >
        {label}
      </CButton>
    );
  };
}

export default Form;
