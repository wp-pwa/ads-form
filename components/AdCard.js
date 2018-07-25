/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import styled from 'styled-components';
import { Field } from 'react-final-form';
import {
  SortableElement as sortableElement,
  SortableHandle as sortableHandle,
} from 'react-sortable-hoc';

const DragHandle = sortableHandle(({ label }) => (
  <p style={{ cursor: 'move' }}>
    <i style={{ color: '#dbdbdb', marginRight: '0.4em' }} />
    {label}
  </p>
));

const AdCard = sortableElement(({ member }) => (
  <Card>
    <Title>
      <DragHandle label="ad" />
    </Title>
    <Content>
      <div>
        <label>Name</label>
        <Field
          name={`${member}.name`}
          component="input"
          type="text"
          placeholder="Name"
        />
      </div>
      <div>
        <label>Type</label>
        <Field name={`${member}.type`} component="select">
          <option value="smartad">Smart Adserver</option>
          <option value="adsense">AdSense</option>
          <option value="doubleclick">DoubleClick</option>
        </Field>
      </div>
    </Content>
  </Card>
));

export default AdCard;

const Card = styled.div`
  width: 100%;
  height: auto;
`;

const Title = styled.div``;

const Content = styled.div`
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
`;
