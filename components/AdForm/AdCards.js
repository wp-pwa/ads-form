import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';

import AdCard from './AdCard';

const SortableList = SortableContainer(({ fields, initialValues, form }) => (
  <span>
    {fields.map((member, index) => (
      <AdCard
        key={member}
        member={member}
        remove={() => fields.remove(index)}
        index={index}
        initialValues={initialValues}
        form={form}
      />
    ))}
  </span>
));

class SortableAdCards extends Component {
  static propTypes = {
    fields: PropTypes.shape({
      move: PropTypes.func.isRequired,
    }).isRequired,
    initialValues: PropTypes.shape({}).isRequired,
    form: PropTypes.shape({}).isRequired,
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.fields.move(oldIndex, newIndex);
  };

  render() {
    const { fields, initialValues, form } = this.props;
    return (
      <SortableList
        fields={fields}
        initialValues={initialValues}
        onSortEnd={this.onSortEnd}
        useDragHandle
        form={form}
      />
    );
  }
}

export default SortableAdCards;
