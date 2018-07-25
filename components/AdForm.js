/* eslint-disable jsx-a11y/label-has-for, no-console */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import { SortableContainer as sortableContainer } from 'react-sortable-hoc';
import AdCard from './AdCard';

const SortableList = sortableContainer(({ fields }) => (
  <span>
    {fields.map((member, index) => {
      console.log(member);
      return (
        <AdCard
          key={member}
          member={member}
          remove={() => fields.remove(index)}
          index={index}
        />
      );
    })}
  </span>
));

class SortableComponent extends Component {
  constructor(props) {
    super(props);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.props.fields.move(oldIndex, newIndex);
  }

  render() {
    const { fields } = this.props;
    return (
      <Fragment>
        <SortableList
          fields={fields}
          onSortEnd={this.onSortEnd}
          useDragHandle
        />
        <button type="button" onClick={() => fields.push({ type: 'smartads' })}>
          Create Ad
        </button>
      </Fragment>
    );
  }
}

SortableComponent.propTypes = {
  fields: PropTypes.shape({
    move: PropTypes.func.isRequired,
  }).isRequired,
};

const onSubmit = values => console.log('submit', values);
const validate = () => console.log('validate');

const AdForm = ({ url }) => (
  <StyledForm
    onSubmit={onSubmit}
    validate={validate}
    mutators={arrayMutators}
    render={({ handleSubmit, pristine, invalid }) => (
      <form onSubmit={handleSubmit}>
        <h2>Ad configuration of {url}</h2>
        <FieldArray name="ads" component={SortableComponent} />
        <button type="submit" disabled={pristine || invalid}>
          Submit
        </button>
      </form>
    )}
  />
);

AdForm.propTypes = {
  url: PropTypes.string.isRequired,
};

export default AdForm;

const StyledForm = styled(Form)`
  max-width: 500px;
  margin: 10px auto;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
`;
