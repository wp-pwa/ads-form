/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import AdOptions from './AdOptions';

const DragHandle = SortableHandle(() => (
  <span role="img" aria-label="up-down">
    ↕️
  </span>
));

class AdCard extends Component {
  static propTypes = {
    member: PropTypes.string.isRequired,
  };

  state = { isOpen: false, type: 'smartad' };

  toggleContent = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { member } = this.props;
    const { isOpen, type } = this.state;
    return (
      <Card>
        <Title>
          <div>
            <DragHandle />
            <Field
              name={`${member}.name`}
              component="input"
              type="text"
              placeholder="Name"
            />
          </div>
          <ToggleContent onClick={this.toggleContent}>
            {isOpen ? '⏫' : '⏬'}
          </ToggleContent>
        </Title>
        {isOpen && (
          <Content>
            <div>
              <label>Type</label>
              <Field name={`${member}.type`} component="select">
                <option value="smartad">Smart Adserver</option>
                <option value="adsense">AdSense</option>
                <option value="doubleclick">DoubleClick</option>
              </Field>
              <OnChange name={`${member}.type`}>
                {value => this.setState({ type: value })}
              </OnChange>
            </div>
            <AdOptions member={member} type={type} />
          </Content>
        )}
      </Card>
    );
  }
}

export default SortableElement(AdCard);

const Card = styled.div`
  width: 100%;
  padding: 0 20px;
  background-color: #fff;
  border-bottom: 1px solid #efefef;
  box-sizing: border-box;

  & > div {
    & > div {
      display: flex;
      line-height: 2em;
      margin: 5px;
      & > label {
        color: #333;
        width: 110px;
        font-size: 1em;
        line-height: 32px;
      }
      & > input,
      & > select,
      & > textarea {
        flex: 1;
        padding: 3px 5px;
        font-size: 1em;
        margin-left: 15px;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
      & > input[type='checkbox'] {
        margin-top: 7px;
      }
      & > div {
        margin-left: 16px;
        & > label {
          display: block;
          & > input {
            margin-right: 3px;
          }
        }
      }
    }
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div``;

const ToggleContent = styled.div`
  height: 32px;
  width: 32px;
  line-height: 32px;
  text-align: center;
`;
