/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { OnChange } from 'react-final-form-listeners';
import { Field } from 'react-final-form';
import { get } from 'lodash';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';
import { Row, Label, Select } from '../styled';

const listTypes = ['latest', 'category', 'tag'];
const singleTypes = ['post', 'page', 'media'];

const itemTypes = {
  list: listTypes,
  single: singleTypes,
};

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
    const { type, customPostTypes } = this.state;
    const items = itemTypes[type];
    return (
      <div>
        <Row>
          <Label>type</Label>
          <Field name={`${member}.type`}>
            {({ input }) => (
              <Select {...input}>
                <option value="list">list</option>
                <option value="single">single</option>
                <option value="custom">custom</option>
              </Select>
            )}
          </Field>
          {items instanceof Array ? (
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
            ))
          ) : (
            <TextInput name={`${member}.items`} value={customPostTypes} />
          )}
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
