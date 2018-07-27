/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import SelectInput from '../SelectInput';
import { required, mustBeNumber, composeValidators } from '../../validators';

const requireNumber = composeValidators(required, mustBeNumber);

const SmartAd = ({ member }) => (
  <>
    <TextInput
      name={`${member}.siteId`}
      label="siteId"
      placeholder="e.g. 103409"
      validate={required}
    />
    <TextInput
      name={`${member}.pageId`}
      label="pageId"
      placeholder="e.g. 659846"
      validate={required}
    />
    <TextInput
      name={`${member}.formatId`}
      label="formatId"
      placeholder="e.g. 14968"
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
    <SelectInput name={`${member}.callType`} label="callType">
      <option value="iframe">iframe</option>
      <option value="std">std</option>
    </SelectInput>
  </>
);

SmartAd.propTypes = {
  member: PropTypes.string.isRequired,
};

export default SmartAd;
