/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { get } from 'lodash';
import AdOptions from './AdOptions';
import AdPositions from './AdPositions';
import TextInput from './TextInput';
import { Row, Label, Input, Select } from './styled';
import { required } from '../validators';
import { SMART_ADSERVER, AD_SENSE, DOUBLE_CLICK } from '../constants';

class AdCard extends Component {
  static propTypes = {
    member: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({}).isRequired,
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

  render() {
    const { member, remove } = this.props;
    const { isOpen, type } = this.state;
    return (
      <Card>
        <Title>
          <DragHandle>{`${'↕️'}`}</DragHandle>
          <Button onClick={this.toggleContent}>{isOpen ? '⏫' : '⏬'}</Button>
          <TextInput
            name={`${member}.name`}
            component={Input}
            type="text"
            placeholder="Name"
            validate={required}
          />
          <Button onClick={remove}>{`${'❌'}`}</Button>
        </Title>
        <Content isOpen={isOpen}>
          <Row>
            <Label>Type</Label>
            <Field name={`${member}.type`}>
              {({ input }) => (
                <Select {...input}>
                  <option value={SMART_ADSERVER}>Smart Adserver</option>
                  <option value={AD_SENSE}>AdSense</option>
                  <option value={DOUBLE_CLICK}>DoubleClick</option>
                </Select>
              )}
            </Field>
          </Row>
          <OnChange name={`${member}.type`}>
            {value => this.setState({ type: value })}
          </OnChange>
          <AdOptions member={member} type={type} />
          <hr />
          <AdPositions member={member} type={type} />
        </Content>
      </Card>
    );
  }
}

export default SortableElement(AdCard);

const Card = styled.div`
  width: 100%;
  padding: 8px 20px;
  background-color: #fff;
  border-bottom: 1px solid #efefef;
  box-sizing: border-box;
`;

const DragHandle = SortableHandle(styled.span`
  margin: 5px;
  height: 32px;
  width: 32px;
  line-height: 32px;
  text-align: center;
  align-self: center;
  &:hover {
    cursor: move;
  }
`);

const Title = styled.div`
  display: flex;
  line-height: 2em;
  align-items: stretch;
  justify-content: space-between;
`;

const Content = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
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
