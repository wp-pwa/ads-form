/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../TextInput';
import { toNumber } from '../formats';

const AdSense = ({ member }) => (
  <>
    <TextInput
      name={`${member}.client`}
      label="client"
      placeholder="ca-pub-1234123412341234"
      required
    />
    <TextInput
      name={`${member}.slot`}
      label="slot"
      placeholder="1234567890"
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
