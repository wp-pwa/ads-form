/* eslint-disable jsx-a11y/label-has-for, no-console */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
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
          key={member.id}
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
        <button
          type="button"
          onClick={() =>
            fields.push({
              id: Math.random(),
              type: 'adsense',
            })
          }
          outlined
          style={{ margin: '0 0.3em 1em 0' }}
        >
          Add menu element
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

const onSubmit = () => console.log('submit');
const validate = () => console.log('validate');

const AdForm = ({ url }) => (
  <Form
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
