/* eslint-disable jsx-a11y/label-has-for, no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import { SortableContainer } from 'react-sortable-hoc';
import { ButtonDefault, ButtonPrimary } from './Buttons';

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

class SortableComponent extends Component {
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

const onSubmit = values => console.log('submit', values);

const AdForm = () => (
  <Form
    onSubmit={onSubmit}
    mutators={arrayMutators}
    render={({ handleSubmit, pristine, invalid }) => (
      <div>
        <Title>Ad Configuration</Title>
        <StyledForm onSubmit={handleSubmit}>
          <FieldArray name="ads.fills">
            {({ fields }) => (
              <div>
                <Buttons>
                  <ButtonDefault
                    type="button"
                    onClick={() => fields.push({ type: 'smartads' })}
                  >
                    Create Ad
                  </ButtonDefault>
                  <ButtonPrimary type="submit" disabled={pristine || invalid}>
                    Submit
                  </ButtonPrimary>
                </Buttons>
                <SortableComponent fields={fields} />
              </div>
            )}
          </FieldArray>
        </StyledForm>
      </div>
    )}
  />
);

AdForm.propTypes = {
  // url: PropTypes.string.isRequired,
};

export default AdForm;

const Title = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.2rem;
  padding: 0px 15px;
  margin: 10px 0px;
`;

const StyledForm = styled.form`
  max-width: 512px;
  background-color: #f3f3f3;
  border: 1px solid #efefef;
  border-radius: 3px;
  outline: none;
`;

const Buttons = styled.div`
  background: white;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
`;
