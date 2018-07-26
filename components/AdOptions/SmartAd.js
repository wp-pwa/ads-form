/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'react-final-form';

const options = [
  { name: 'siteId', label: 'siteId', placeholder: '' },
  { name: 'pageId', label: 'pageId', placeholder: '' },
  { name: 'formatId', label: 'formatId', placeholder: '' },
  { name: 'callType', label: 'callType', placeholder: 'iframe' },
  { name: 'width', label: 'width', placeholder: '300' },
  { name: 'height', label: 'height', placeholder: '250' },
];

const TextInput = ({ member, name, label, placeholder }) => (
  <Row>
    <label>{label}</label>
    <Field
      name={`${member}.${name}`}
      component="input"
      type="text"
      placeholder={placeholder}
    />
  </Row>
);

TextInput.propTypes = {
  member: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

const SmartAd = ({ member }) =>
  options.map(({ name, label, placeholder }) => (
    <TextInput
      member={member}
      name={name}
      label={label}
      placeholder={placeholder}
    />
  ));

SmartAd.propTypes = {
  member: PropTypes.string.isRequired,
};

export default SmartAd;

const Row = styled.div`
  display: flex;
  line-height: 2em;
  margin: 5px;
`;
