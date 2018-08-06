/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Row, Label, Select } from './styled';

const SelectInput = ({ name, label, children, ...rest }) => (
  <Row>
    <Label>{label}</Label>
    <Field name={name} {...rest}>
      {({ input }) => <Select {...input}>{children}</Select>}
    </Field>
  </Row>
);

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default SelectInput;
