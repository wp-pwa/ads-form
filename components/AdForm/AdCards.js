import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';

import AdCard from './AdCard';

const SortableList = SortableContainer(({ fields }) => (
  <div>
    {fields.map((member, index) => (
      <AdCard
        key={member}
        member={member}
        remove={() => fields.remove(index)}
        index={index}
      />
    ))}
  </div>
));

class SortableAdCards extends Component {
  static propTypes = {
    fields: PropTypes.shape({
      move: PropTypes.func.isRequired,
    }).isRequired,
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    try {
      this.props.fields.move(oldIndex, newIndex);
    } catch (error) {
      // hide errors from a bug in 'react-final-form-arrays'
      // See https://github.com/final-form/react-final-form-arrays/issues/39
    }
  };

  render() {
    const { fields } = this.props;
    return (
      <SortableList fields={fields} onSortEnd={this.onSortEnd} useDragHandle />
    );
  }
}

export default SortableAdCards;
