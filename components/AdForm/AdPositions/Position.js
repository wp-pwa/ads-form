/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'react-final-form-html5-validation';
import SelectInput from '../../SelectInput';
import { toArray } from '../formats';
import { types, typeToText } from '../types';
import Condition from '../Condition';

class Position extends Component {
  static propTypes = {
    member: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired,
  };

  renderItemSelector = type => {
    const { member } = this.props;
    return (
      <ItemSelector>
        {types[type].items.map(value => (
          <div key={value}>
            <Field
              name={`${member}.items`}
              component="input"
              type="checkbox"
              value={value}
            />
            <CheckboxLabel key={value}>
              {typeToText[value] || value}
            </CheckboxLabel>
          </div>
        ))}
      </ItemSelector>
    );
  };

  renderCustomItemSelector = () => {
    const { member } = this.props;
    return (
      <Field
        component="input"
        type="text"
        name={`${member}.items`}
        parse={toArray}
        placeholder="new,product,..."
      />
    );
  };

  renderPositionSelector = type => {
    const { member } = this.props;
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
                <option value="list">lists of posts</option>
                <option value="single">single</option>
                <option value="media">gallery</option>
                <option value="customPostType">custom post type</option>
              </Field>
              <Condition
                when={`${member}.type`}
                satisfies={value => ['list', 'single', 'media'].includes(value)}
              >
                {this.renderItemSelector}
              </Condition>
              <Condition when={`${member}.type`} is="customPostType">
                {this.renderCustomItemSelector()}
              </Condition>
            </div>
          </div>
          <Condition
            when={`${member}.type`}
            satisfies={value =>
              ['list', 'single', 'media', 'customPostType'].includes(value)
            }
          >
            {this.renderPositionSelector}
          </Condition>
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
  flex-direction: column;
  box-sizing: border-box;

  & > div {
    display: flex;
    align-items: center;
  }
`;

const PositionSelector = styled.div`
  padding-top: 8px;
`;
