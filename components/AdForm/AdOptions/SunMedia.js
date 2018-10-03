/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../TextInput';
import { toNumber } from '../formats';

const SunMedia = ({ member }) => (
  <>
    <TextInput
      name={`${member}.src`}
      label="src"
      placeholder="https://platform.sunmedia.tv/integrations/00000.js"
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

SunMedia.propTypes = {
  member: PropTypes.string.isRequired,
};

export default SunMedia;
