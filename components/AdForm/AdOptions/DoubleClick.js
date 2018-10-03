/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../TextInput';
import { toNumber } from '../formats';

const DoubleClick = ({ member }) => (
  <>
    <TextInput
      name={`${member}.slot`}
      label="slot"
      placeholder="/12345678/ad-roba_1"
      required
    />
    <TextInput
      name={`${member}.width`}
      label="width"
      placeholder="300"
      pattern="\d+"
      patternMismatch="Must be a number"
      required
      parse={toNumber}
    />
    <TextInput
      name={`${member}.height`}
      label="height"
      placeholder="250"
      pattern="\d+"
      patternMismatch="Must be a number"
      required
      parse={toNumber}
    />
  </>
);

DoubleClick.propTypes = {
  member: PropTypes.string.isRequired,
};

export default DoubleClick;
