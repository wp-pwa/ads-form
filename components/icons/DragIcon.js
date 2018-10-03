import React from 'react';
import PropTypes from 'prop-types';

const DragIcon = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-more-vertical"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

DragIcon.propTypes = {
  size: PropTypes.number,
};

DragIcon.defaultProps = {
  size: 24,
};

export default DragIcon;
