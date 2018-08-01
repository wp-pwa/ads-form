/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'react-final-form-arrays';
import Position from './Position';
import { ButtonDefault } from '../Buttons';

const AdPositions = ({ member }) => (
  <FieldArray name={`${member}.positions`}>
    {({ fields }) => (
      <>
        <div>
          <ButtonDefault
            type="button"
            onClick={() => fields.push({ items: [], position: 0 })}
          >
            Add Position
          </ButtonDefault>
        </div>
        {fields &&
          fields.map((name, index) => (
            <Position
              key={name}
              member={name}
              remove={() => fields.remove(index)}
            />
          ))}
      </>
    )}
  </FieldArray>
);

AdPositions.propTypes = {
  member: PropTypes.string.isRequired,
};

export default AdPositions;
