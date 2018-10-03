/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../TextInput';
import SelectInput from '../../SelectInput';
import { toNumber } from '../formats';

const SmartAd = ({ member }) => (
  <>
    <TextInput
      name={`${member}.siteId`}
      label="siteId"
      placeholder="103409"
      required
    />
    <TextInput
      name={`${member}.pageId`}
      label="pageId"
      placeholder="659846"
      required
    />
    <TextInput
      name={`${member}.formatId`}
      label="formatId"
      placeholder="14968"
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
