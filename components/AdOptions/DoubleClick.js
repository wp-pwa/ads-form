/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';

const options = [
  { name: 'siteId', label: 'siteId', placeholder: 'e.g. 103409' },
  { name: 'pageId', label: 'pageId', placeholder: 'e.g. 659846' },
  { name: 'formatId', label: 'formatId', placeholder: 'e.g. 14968' },
  { name: 'callType', label: 'callType', placeholder: 'iframe' },
  { name: 'width', label: 'width', placeholder: '300' },
  { name: 'height', label: 'height', placeholder: '250' },
];

const SmartAd = ({ member }) =>
  options.map(({ name, label, placeholder }) => (
    <TextInput
      member={member}
      key={name}
      name={name}
      label={label}
      placeholder={placeholder}
    />
  ));

SmartAd.propTypes = {
  member: PropTypes.string.isRequired,
};

export default SmartAd;
