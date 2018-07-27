/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import { required, mustBeNumber, composeValidators } from '../../validators';

const requireNumber = composeValidators(required, mustBeNumber);

const DoubleClick = ({ member }) => (
  <>
    <TextInput
      name={`${member}.slot`}
      label="slot"
      placeholder="/12345678/ad-roba_1"
      validate={required}
    />
    <TextInput
      name={`${member}.width`}
      label="width"
      placeholder="300"
      validate={requireNumber}
    />
    <TextInput
      name={`${member}.height`}
      label="height"
      placeholder="250"
      validate={requireNumber}
    />
  </>
);

DoubleClick.propTypes = {
  member: PropTypes.string.isRequired,
};

export default DoubleClick;
