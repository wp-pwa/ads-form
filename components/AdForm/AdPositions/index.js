/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FieldArray } from 'react-final-form-arrays';
import Position from './Position';
import { types, positions } from '../types';

const AdPositions = ({ member, initialValues, form }) => (
  <FieldArray name={`${member}.positions`}>
    {({ fields }) => (
      <>
        <h5>Positions</h5>
        {fields &&
          fields.map((name, index) => (
            <Position
              key={name}
              member={name}
              initialValues={initialValues}
              remove={() => fields.remove(index)}
              form={form}
            />
          ))}
        <AlignCenter>
          <input
            type="button"
            value="Add Position"
            className="primary small"
            onClick={() => {
              fields.push({
                items: [types.list.items[0]],
                position: positions.list[0],
              });
            }}
          />
        </AlignCenter>
      </>
    )}
  </FieldArray>
);

AdPositions.propTypes = {
  member: PropTypes.string.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}).isRequired,
};

export default AdPositions;

const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
`;
