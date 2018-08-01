/* eslint-disable jsx-a11y/label-has-for, no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import SortableAdCards from './SortableAdCards';
import { ButtonDefault, ButtonPrimary } from './Buttons';
import { SMART_ADSERVER } from '../constants';

const UPDATE_SETTING = gql`
  mutation UpdateSetting($id: ID!, $values: Json!) {
    updateSetting(id: $id, value: $values) {
      id
    }
  }
`;

const postLoadFormat = values => values;

const preSaveFormat = (values, originalValues) => {
  const { ads } = values;
  const { ads: _, ...others } = originalValues;
  return { ads, ...others };
};

class AdForm extends Component {
  state = {};

  componentDidMount() {
    this.load();
  }

  load = () => {
    const { initialValues: originalValues } = this.props;
    const initialValues = postLoadFormat(originalValues);
    this.setState({ originalValues, initialValues });
  };

  save = async (values, updateSetting) => {
    const { id } = this.props;
    const valuesToSave = preSaveFormat(values, this.state.originalValues);
    const result = await updateSetting({ variables: { id, values } });
    this.setState({
      originalValues: valuesToSave,
      initialValues: postLoadFormat(valuesToSave),
    });
    return result;
  };

  render() {
    const { initialValues } = this.state;
    return (
      <Mutation mutation={UPDATE_SETTING}>
        {updateSetting => (
          <Form
            initialValues={initialValues}
            onSubmit={async values => {
              console.log('submit', values);
              this.save(values, updateSetting);
            }}
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
                            onClick={() =>
                              fields.push({ type: SMART_ADSERVER })
                            }
                          >
                            Create Ad
                          </ButtonDefault>
                          <ButtonPrimary
                            type="submit"
                            disabled={pristine || invalid}
                          >
                            Submit
                          </ButtonPrimary>
                        </Buttons>
                        <SortableAdCards
                          fields={fields}
                          initialValues={initialValues}
                        />
                      </div>
                    )}
                  </FieldArray>
                </StyledForm>
              </div>
            )}
          />
        )}
      </Mutation>
    );
  }
}

AdForm.propTypes = {
  id: PropTypes.string.isRequired,
  initialValues: PropTypes.shape({
    ads: PropTypes.shape({}).isRequired,
  }).isRequired,
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
