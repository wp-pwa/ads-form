/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { OnChange } from 'react-final-form-listeners';
import { Field } from 'react-final-form-html5-validation';
import { get } from 'lodash';
import SelectInput from '../../SelectInput';
import { toArray } from '../formats';
import { types, positions } from '../types';

class Position extends Component {
  static propTypes = {
    member: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({}).isRequired,
    remove: PropTypes.func.isRequired,
    form: PropTypes.shape({
      change: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    const type = get(props.initialValues, `${props.member}.type`) || 'list';

    const customPostTypes =
      type === 'customPostType'
        ? get(props.initialValues, `${props.member}.items`)
        : '';

    this.state = { type, customPostTypes };
  }

  setType = value => {
    if (value !== '' && this.state.type !== value)
      this.setState({ type: value }, () => {
        const newPosition =
          positions[value !== 'customPostType' ? value : 'single'][0];
        const initialValue =
          value !== 'customPostType' ? types[value].items[0] : '';
        this.props.form.change(`${this.props.member}.position`, newPosition);
        this.props.form.change(`${this.props.member}.items`, [initialValue]);
      });
  };
  setCustomPostTypes = value => this.setState({ customPostTypes: value });

  renderItemSelector = () => {
    const { member } = this.props;
    const { type, customPostTypes } = this.state;
    const { items } = types[type];
    return items ? (
      <ItemSelector>
        {items.map(value => (
          <div key={value}>
            <Field
              name={`${member}.items`}
              component="input"
              type="checkbox"
              value={value}
            />
            <CheckboxLabel key={value}>{value}</CheckboxLabel>
          </div>
        ))}
      </ItemSelector>
    ) : (
      <Field
        component="input"
        type="text"
        name={`${member}.items`}
        value={customPostTypes}
        parse={toArray}
        placeholder="new,product,..."
      />
    );
  };

  renderPositionSelector = () => {
    const { member } = this.props;
    const { type } = this.state;
    return (
      <PositionSelector>
        <SelectInput name={`${member}.position`} label="position">
          {types[type].positions.map(position => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </SelectInput>
      </PositionSelector>
    );
  };

  render() {
    const { member, remove } = this.props;
    return (
      <div className="card fluid shadowed">
        <div className="section">
          <div className="row">
            <LabelContainer className="col-sm-3">
              <label>page type</label>
            </LabelContainer>
            <div className="col-sm">
              <Field component="select" name={`${member}.type`}>
                <option value="list">list</option>
                <option value="single">single</option>
                <option value="media">media</option>
                <option value="customPostType">custom post type</option>
              </Field>
              {this.renderItemSelector()}
              <OnChange name={`${member}.type`}>{this.setType}</OnChange>
            </div>
          </div>
          {this.renderPositionSelector()}
          <BtnContainer>
            <button type="button" className="secondary small" onClick={remove}>
              delete
            </button>
          </BtnContainer>
        </div>
      </div>
    );
  }
}

export default Position;

const BtnContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;

  button {
    font-size: 12px;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  font-weight: 700;
`;

const CheckboxLabel = styled.label`
  font-size: 12px;
`;

const ItemSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;

  & > div {
    display: flex;
    align-items: center;
    margin-right: 8px;
  }
`;

const PositionSelector = styled.div`
  padding-top: 8px;
`;
