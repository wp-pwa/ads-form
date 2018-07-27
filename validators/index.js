export const required = value => (value ? undefined : 'Required');

export const mustBeNumber = value =>
  Number.isNaN(Number(value)) ? 'Must be a number' : undefined;

export const minValue = min => value =>
  Number.isNaN(Number(value)) || Number(value) >= min
    ? undefined
    : `Should be greater than ${min}`;

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);
