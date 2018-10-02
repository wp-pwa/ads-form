/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'react-final-form';

const SelectInput = ({ name, label, children, ...rest }) => (
  <div className="row responsive-label">
    <div className="col-sm-3">
      <LabelContainer>
        <label>{label}</label>
      </LabelContainer>
    </div>
    <div className="col-sm">
      <Field name={name} {...rest}>
        {({ input }) => <Select {...input}>{children}</Select>}
      </Field>
    </div>
  </div>
);

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default SelectInput;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Select = styled.select`
  width: 85%;
`;
