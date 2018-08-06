/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import { required, mustBeNumber, composeValidators } from '../../validators';

const requireNumber = composeValidators(required, mustBeNumber);

const SunMedia = ({ member }) => (
  <>
    <TextInput
      name={`${member}.src`}
      label="src"
      placeholder="https://platform.sunmedia.tv/integrations/00000.js"
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
  </>
);

SunMedia.propTypes = {
  member: PropTypes.string.isRequired,
};

export default SunMedia;
