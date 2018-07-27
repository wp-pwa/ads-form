/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Row, Label, Input, ErrorMsg } from './styled';

const required = value => (value ? undefined : 'Required');
// const mustBeNumber = value => (isNaN(value) ? "Must be a number" : undefined);
// const minValue = min => value =>
//   isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
// const composeValidators = (...validators) => value =>
//   validators.reduce((error, validator) => error || validator(value), undefined);

const TextInput = ({ member, name, label, placeholder }) => (
  <Field name={`${member}.${name}`} validate={required}>
    {({ input, meta: { error, touched, active } }) => (
      <Row>
        {label && <Label>{label}</Label>}
        <Input
          {...input}
          invalid={touched && error && !active}
          type="text"
          placeholder={placeholder}
        />
        {error && touched && <ErrorMsg>{error}</ErrorMsg>}
      </Row>
    )}
  </Field>
);

TextInput.propTypes = {
  member: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default TextInput;
