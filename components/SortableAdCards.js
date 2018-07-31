import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';

import AdCard from './AdCard';

const SortableList = SortableContainer(({ fields }) => (
  <span>
    {fields.map((member, index) => (
      <AdCard
        key={member}
        member={member}
        remove={() => fields.remove(index)}
        index={index}
      />
    ))}
  </span>
));

class SortableAdCards extends Component {
  static propTypes = {
    fields: PropTypes.shape({
      move: PropTypes.func.isRequired,
    }).isRequired,
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.fields.move(oldIndex, newIndex);
  };

  render() {
    const { fields } = this.props;
    return (
      <SortableList fields={fields} onSortEnd={this.onSortEnd} useDragHandle />
    );
  }
}

export default SortableAdCards;
