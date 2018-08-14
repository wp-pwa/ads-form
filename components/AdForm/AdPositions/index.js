/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'react-final-form-arrays';
import Position from './Position';
import { ButtonDefault } from '../../Buttons';
import { types, positions } from '../types';

const AdPositions = ({ member, initialValues, form }) => (
  <FieldArray name={`${member}.positions`}>
    {({ fields }) => (
      <>
        <div>
          <ButtonDefault
            type="button"
            onClick={() => {
              fields.push({
                items: [types.list.items[0]],
                position: positions.list[0],
              });
            }}
          >
            Add Position
          </ButtonDefault>
        </div>
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
