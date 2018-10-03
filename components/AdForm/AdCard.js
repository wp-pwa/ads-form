/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { OnChange } from 'react-final-form-listeners';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { get } from 'lodash';
import { Field } from 'react-final-form-html5-validation';
import AdOptions from './AdOptions';
import AdPositions from './AdPositions';
import SelectInput from '../SelectInput';
import DragIcon from '../icons/DragIcon';
import SettingsIcon from '../icons/SettingsIcon';
import CloseIcon from '../icons/CloseIcon';

import {
  SMART_ADSERVER,
  AD_SENSE,
  DOUBLE_CLICK,
  SUN_MEDIA,
} from '../../constants';

class AdCard extends Component {
  static propTypes = {
    member: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({}).isRequired,
    form: PropTypes.shape({}).isRequired,
  };

  state = {
    isOpen: false,
    type:
      get(this.props.initialValues, `${this.props.member}.type`) ||
      SMART_ADSERVER,
  };

  toggleContent = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  updateType = value => value && this.setState({ type: value });

  render() {
    const { member, remove, initialValues, form } = this.props;
    const { isOpen, type } = this.state;
    const iconSize = 24;
    return (
      <div className="card fluid">
        <div className="row section">
          <DragHandle className="col-sm-1">
            <Icon title="drag and drop">
              <DragIcon size={iconSize} />
            </Icon>
          </DragHandle>
          <Name className="col-sm-10">
            <Field
              component="input"
              name={`${member}.name`}
              type="text"
              placeholder="ad name"
              required
            />
          </Name>
          <div className="col-sm-1">
            <Icon title="config" onClick={this.toggleContent}>
              {isOpen ? (
                <CloseIcon size={iconSize} />
              ) : (
                <SettingsIcon size={iconSize} />
              )}
            </Icon>
          </div>
        </div>
        <Content isOpen={isOpen} className="section">
          <SelectInput name={`${member}.type`} label="Ad type">
            <option value={SMART_ADSERVER}>Smart Adserver</option>
            <option value={AD_SENSE}>AdSense</option>
            <option value={DOUBLE_CLICK}>DoubleClick</option>
            <option value={SUN_MEDIA}>SunMedia</option>
          </SelectInput>
          <OnChange name={`${member}.type`}>{this.updateType}</OnChange>
          <AdOptions member={member} type={type} />
          <BtnContainer>
            <button type="button" className="secondary small" onClick={remove}>
              delete
            </button>
          </BtnContainer>
          <hr />
          <AdPositions
            member={member}
            initialValues={initialValues}
            type={type}
            form={form}
          />
        </Content>
      </div>
    );
  }
}

export default SortableElement(AdCard);

const DragHandle = SortableHandle('div');

const Content = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const Name = styled.div`
  input {
    width: 85%;
  }
`;

const Icon = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 16px;

  button {
    font-size: 12px;
  }
`;
