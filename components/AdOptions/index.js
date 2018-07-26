import React from 'react';
import PropTypes from 'prop-types';
import SmartAd from './SmartAd';

const componentMap = {
  smartad: SmartAd,
};

const AdOptions = ({ member, type }) => {
  const Options = componentMap[type];
  return Options ? <Options member={member} /> : null;
};

AdOptions.propTypes = {
  member: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default AdOptions;
