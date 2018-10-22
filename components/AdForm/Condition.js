import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const Condition = ({ when, is, satisfies, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => {
      if ((is && is === value) || (satisfies && satisfies(value))) {
        return typeof children === 'function' ? children(value) : children;
      }
      return null;
    }}
  </Field>
);

Condition.propTypes = {
  when: PropTypes.string.isRequired,
  is: PropTypes.string,
  satisfies: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

Condition.defaultProps = {
  is: '',
  satisfies: null,
};

export default Condition;
