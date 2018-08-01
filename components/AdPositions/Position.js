/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { OnChange } from 'react-final-form-listeners';
import { Field } from 'react-final-form';
import SelectInput from '../SelectInput';
import { Row, Label, Select } from '../styled';

const itemTypes = {
  list: ['home', 'categories', 'tags'],
  single: ['posts', 'pages', 'media'],
};

class Position extends Component {
  static propTypes = {
    member: PropTypes.string.isRequired,
  };

  state = { type: 'list' };

  setType = value => this.setState({ type: value });

  renderPositionSelector = () => {
    const { member } = this.props;
    const { type } = this.state;
    const element = type === 'list' ? 'post' : 'paragraph';
    return (
      <SelectInput name={`${member}.position`} label="position">
        {Array(30)
          .fill(undefined)
          .map((e, n) => n)
          .map(n => (
            <option key={`post${n}`} value={n}>
              {n === 0 ? `before ${element} 1` : `after ${element} ${n}`}
            </option>
          ))}
      </SelectInput>
    );
  };

  render() {
    const { member } = this.props;
    const items = itemTypes[this.state.type];
    return (
      <div>
        <Row>
          <Label>type</Label>
          <Field name={`${member}.type`}>
            {({ input }) => (
              <Select {...input}>
                <option value="list">list</option>
                <option value="single">single</option>
              </Select>
            )}
          </Field>
          {items &&
            items.map(value => (
              <CheckBoxLabel key={value}>
                <Field
                  name={`${member}.items`}
                  component="input"
                  type="checkbox"
                  value={value}
                />{' '}
                {value}
              </CheckBoxLabel>
            ))}
        </Row>
        <OnChange name={`${member}.type`}>{this.setType}</OnChange>
        {this.renderPositionSelector()}
      </div>
    );
  }
}

export default Position;

const CheckBoxLabel = styled.label`
  margin-left: 8px;
`;
