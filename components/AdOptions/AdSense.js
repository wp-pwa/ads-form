/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import { required, mustBeNumber, composeValidators } from '../../validators';

const requireNumber = composeValidators(required, mustBeNumber);

const AdSense = ({ member }) => (
  <>
    <TextInput
      name={`${member}.client`}
      label="client"
      placeholder="ca-pub-1234123412341234"
      validate={required}
    />
    <TextInput
      name={`${member}.slot`}
      label="slot"
      placeholder="1234567890"
      validate={required}
    />
    <TextInput
      name={`${member}.width`}
      label="width"
      placeholder="300"
      validate={requireNumber}
      parse={input => Number(input)}
    />
    <TextInput
      name={`${member}.height`}
      label="height"
      placeholder="250"
      validate={requireNumber}
      parse={input => Number(input)}
    />
    <TextInput
      name={`${member}.format`}
      label="format"
      placeholder="rectangle"
    />
  </>
);

AdSense.propTypes = {
  member: PropTypes.string.isRequired,
};

export default AdSense;
