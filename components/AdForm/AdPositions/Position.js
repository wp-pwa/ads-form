/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { OnChange } from 'react-final-form-listeners';
import { Field } from 'react-final-form-html5-validation';
import { get } from 'lodash';
import SelectInput from '../../SelectInput';
import TextInput from '../../TextInput';
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
          <div>
            <Field
              name={`${member}.items`}
              component="input"
              type="checkbox"
              value={value}
            />
            <label key={value}>{value}</label>
          </div>
        ))}
      </ItemSelector>
    ) : (
      <TextInput
        label=" "
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
      <div className="card fluid shadowed">
        <div className="row section">
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
        <AlignRight>
          <button className="secondary small" onClick={remove}>
            delete
          </button>
        </AlignRight>
      </div>
    );
  }
}

export default Position;

const AlignRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ItemSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  & > div {
    display: flex;
    align-items: center;
  }
`;
