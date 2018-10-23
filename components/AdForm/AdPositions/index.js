/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FieldArray } from 'react-final-form-arrays';
import Position from './Position';
import { types, positions } from '../types';

const AdPositions = ({ member }) => (
  <FieldArray name={`${member}.positions`}>
    {({ fields }) => (
      <>
        <Title>Ad placements</Title>
        {fields &&
          fields.map((name, index) => (
            <Position
              key={name}
              member={name}
              remove={() => fields.remove(index)}
            />
          ))}
        <AlignCenter>
          <input
            type="button"
            value="Add placement"
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
};

export default AdPositions;

const AlignCenter = styled.div`
  padding-top: 16px;
  display: flex;
  justify-content: center;
`;

const Title = styled.h5`
  font-weight: 700;
`;
