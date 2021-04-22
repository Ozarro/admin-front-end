import CIcon from "@coreui/icons-react";
import {
  CButton,
  CFormGroup,
  CFormText,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLabel,
  CSelect,
  CSpinner,
  CTextarea,
} from "@coreui/react";
import Joi from "joi";
import _ from "lodash";
import { Component } from "react";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.callServer();
  };

  validate = () => {
    let data = this.state.data;
    if (this.validateList) {
      data = _.pick(data, this.validateList);
    }
    const result = Joi.object(this.schema).validate(data, {
      abortEarly: false,
    });
    return result.error ? result.error : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    const data = { ...this.state.data };
    data[name] = value;
    const error = this.validateProperty(name, value);
    const errors = { ...this.state.errors };
    error ? (errors[name] = error) : delete errors[name];
    this.setState({ data, errors });
  };

  validateProperty = (name, value) => {
    if (
      !this.validateList ||
      (this.validateList && _.indexOf(this.validateList, name) !== -1)
    ) {
      const schema = {
        [name]: this.schema[name],
      };
      const data = { [name]: value };
      const result = Joi.object(schema).validate(data);
      return result.error
        ? result.error.details[0].message.replace('"', "").replace('"', "")
        : null;
    }
  };

  renderInput = (
    name,
    label,
    type,
    others = {},
    hidden = false,
    helpBlock = "",
    valid = false,
    invalid = false
  ) => {
    const { data, errors } = this.state;
    return (
      <CFormGroup hidden={hidden}>
        <CLabel htmlFor={name}>{label}</CLabel>
        <CInput
          type={type}
          id={name}
          name={name}
          onChange={this.handleChange}
          value={data[name]}
          valid={valid}
          invalid={invalid}
          {...others}
        />
        <CFormText className="help-block">{helpBlock}</CFormText>
        <CFormText className="help-block" color="danger">
          {errors[name]}
        </CFormText>
      </CFormGroup>
    );
  };

  renderInputGroup = (
    name,
    type,
    placeholder,
    iconName,
    others = {},
    hidden = false,
    valid = false,
    invalid = false
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
            valid={valid}
            invalid={invalid}
            placeholder={placeholder}
            {...others}
          />
        </CInputGroup>
        <CFormText className="help-block" color="danger">
          {errors[name]}
        </CFormText>
      </CFormGroup>
    );
  };

  renderSelectGroup = (
    name,
    placeholder,
    iconName,
    options,
    others = {},
    hidden = false,
    valid = false,
    invalid = false
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
            valid={valid}
            invalid={invalid}
            {...others}
          >
            <option value="" disabled hidden>
              {placeholder}
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
        </CInputGroup>
        <CFormText className="help-block" color="danger">
          {errors[name]}
        </CFormText>
      </CFormGroup>
    );
  };

  renderSelect = (
    name,
    label,
    options,
    others = {},
    hidden = false,
    helpBlock = "",
    valid = false,
    invalid = false
  ) => {
    const { data, errors } = this.state;
    return (
      <CFormGroup hidden={hidden}>
        <CLabel htmlFor={name}>{label}</CLabel>
        <CSelect
          custom
          name={name}
          id={name}
          value={data[name]}
          onChange={this.handleChange}
          valid={valid}
          invalid={invalid}
          {...others}
        >
          <option value="" disabled hidden>
            Choose here..
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
        <CFormText className="help-block">{helpBlock}</CFormText>
        <CFormText className="help-block" color="danger">
          {errors[name]}
        </CFormText>
      </CFormGroup>
    );
  };

  renderTextArea(
    name,
    label,
    rows,
    others = {},
    hidden = false,
    helpBlock = "",
    valid = false,
    invalid = false
  ) {
    const { data, errors } = this.state;
    return (
      <CFormGroup hidden={hidden}>
        <CLabel htmlFor={name}>{label}</CLabel>
        <CTextarea
          rows={rows}
          id={name}
          name={name}
          onChange={this.handleChange}
          value={data[name]}
          valid={valid}
          invalid={invalid}
          {...others}
        />
        <CFormText className="help-block">{helpBlock}</CFormText>
        <CFormText className="help-block" color="danger">
          {errors[name]}
        </CFormText>
      </CFormGroup>
    );
  }

  renderButton = (label) => {
    return (
      <CButton
        disabled={this.validate() ? true : false}
        type="submit"
        size="sm"
        color="primary"
      >
        <CSpinner color="danger" size="sm" /> {label}
      </CButton>
    );
  };

  renderBtn = (label, others = {}, spinner = false) => {
    return (
      <CButton
        disabled={this.validate() ? true : false}
        type="submit"
        {...others}
      >
        {spinner ? <CSpinner color="dark" size="sm" /> : ""} {label}
      </CButton>
    );
  };
}

export default Form;
