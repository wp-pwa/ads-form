/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'react-final-form-html5-validation';

const TextInput = ({ name, label, ...rest }) => (
  <div className="row">
    <LabelContainer className="col-sm-3">
      <label>{label}</label>
    </LabelContainer>
    <div className="col-sm">
      <Field component="input" type="text" name={name} {...rest} />
    </div>
  </div>
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextInput;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
