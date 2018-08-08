/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { OnChange } from 'react-final-form-listeners';
import { Field } from 'react-final-form';
import { get } from 'lodash';
import SelectInput from '../../SelectInput';
import TextInput from '../../TextInput';
import { Row, Label, Select } from '../../styled';
import { toArray } from '../formats';
import types from '../types';

class Position extends Component {
  static propTypes = {
    member: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({}).isRequired,
    remove: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const type = get(props.initialValues, `${props.member}.type`) || 'list';

    const customPostTypes =
      type === 'custom'
        ? get(props.initialValues, `${props.member}.items`)
        : '';

    this.state = { type, customPostTypes };
  }

  setType = value => this.setState({ type: value });
  setCustomPostTypes = value => this.setState({ customPostTypes: value });

  renderItemSelector = () => {
    const { member } = this.props;
    const { type, customPostTypes } = this.state;
    const { items } = types[type];
    return items ? (
      items.map(value => (
        <CheckBoxLabel key={value}>
          <Field
            name={`${member}.items`}
            component="input"
            type="checkbox"
            value={value}
          />
          {value}
        </CheckBoxLabel>
      ))
    ) : (
      <TextInput
        name={`${member}.items`}
        value={customPostTypes}
        parse={toArray}
      />
    );
  };

  renderPositionSelector = () => {
    const { member } = this.props;
    const { type } = this.state;
    return (
      <SelectInput name={`${member}.position`} label="position">
        {types[type].positions.map(position => (
          <option key={position} value={position}>
            {position}
          </option>
        ))}
      </SelectInput>
    );
  };

  render() {
    const { member, remove } = this.props;
    return (
      <div>
        <Row>
          <Label>type</Label>
          <Field name={`${member}.type`}>
            {({ input }) => (
              <Select {...input}>
                <option value="list">list</option>
                <option value="single">single</option>
                <option value="media">media</option>
                <option value="customPostType">custom post type</option>
              </Select>
            )}
          </Field>
        </Row>
        <ItemSelector>{this.renderItemSelector()}</ItemSelector>
        <OnChange name={`${member}.type`}>{this.setType}</OnChange>
        <PositionSelector>
          {this.renderPositionSelector()}
          <Button onClick={remove}>{`${'❌'}`}</Button>
        </PositionSelector>
      </div>
    );
  }
}

export default Position;

const CheckBoxLabel = styled.label`
  margin-left: 8px;
`;

const Button = styled.div`
  margin: 5px;
  height: 32px;
  width: 32px;
  line-height: 32px;
  text-align: center;
  align-self: center;
  &:hover {
    cursor: pointer;
  }
`;

const ItemSelector = styled.div`
  padding-left: 110px;
  display: flex;
  flex: 1;
  line-height: 2em;
  box-sizing: border-box;
  align-items: stretch;
  justify-content: flex-start;
  & > * {
    margin-left: 15px;
  }
`;

const PositionSelector = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  line-height: 2em;
  box-sizing: border-box;
  align-items: stretch;
  justify-content: space-between;
`;
