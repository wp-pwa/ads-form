/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Row, Label, Input, ErrorMsg } from './styled';

const TextInput = ({ name, label, placeholder, validate }) => (
  <Field name={name} validate={validate}>
    {({ input, meta }) => (
      <Row>
        {label && <Label>{label}</Label>}
        <Input {...input} meta={meta} type="text" placeholder={placeholder} />
        {meta.error && meta.touched && <ErrorMsg>{meta.error}</ErrorMsg>}
      </Row>
    )}
  </Field>
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  validate: PropTypes.func,
};

TextInput.defaultProps = {
  label: null,
  placeholder: '',
  validate: () => {},
};

export default TextInput;
