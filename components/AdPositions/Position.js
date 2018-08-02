/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { OnChange } from 'react-final-form-listeners';
import { Field } from 'react-final-form';
import { get } from 'lodash';
import SelectInput from '../SelectInput';
import { Row, Label, Select } from '../styled';

const itemTypes = {
  list: ['home', 'categories', 'tags'],
  single: ['posts', 'pages', 'media'],
};

class Position extends Component {
  static propTypes = {
    member: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({}).isRequired,
    remove: PropTypes.func.isRequired,
  };

  state = {
    type: get(this.props.initialValues, `${this.props.member}.type`) || 'list',
  };

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
    const { member, remove } = this.props;
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
        <Container>
          {this.renderPositionSelector()}
          <Button onClick={remove}>{`${'❌'}`}</Button>
        </Container>
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

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  line-height: 2em;
  box-sizing: border-box;
  align-items: stretch;
  justify-content: space-between;
`;
