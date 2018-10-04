/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'react-final-form-html5-validation';
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
    <div className="row">
      <LabelContainer className="col-sm-3">
        <label>format</label>
        <small>(optional)</small>
      </LabelContainer>
      <InputContainer className="col-sm">
        <Field
          component="input"
          type="text"
          name={`${member}.format`}
          placeholder="rectangle"
        />
      </InputContainer>
    </div>
  </>
);

AdSense.propTypes = {
  member: PropTypes.string.isRequired,
};

export default AdSense;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
  font-weight: 700;
  text-align: right;

  small {
    position: relative;
    top: -8px;
    font-weight: normal;
    color: var(--border-color);
    padding: 0 var(--universal-padding);
  }
`;

const InputContainer = styled.div`
  input {
    font-size: 12px;
  }
`;
