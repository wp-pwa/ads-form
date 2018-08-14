/* eslint-disable jsx-a11y/label-has-for, no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { postLoadFormat, preSaveFormat } from './formats';
import AdCards from './AdCards';
import { ButtonDefault, ButtonPrimary } from '../Buttons';
import { SMART_ADSERVER } from '../../constants';

const UPDATE_SETTING = gql`
  mutation UpdateSetting($id: ID!, $values: Json!) {
    updateSetting(id: $id, value: $values) {
      id
    }
  }
`;

class AdForm extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  state = {};

  static getDerivedStateFromProps(props, state) {
    if (!state.originalValues) {
      const { initialValues: originalValues } = props;
      const initialValues = postLoadFormat(originalValues);
      return { originalValues, initialValues };
    }
    return null;
  }

  save = async (values, updateSetting) => {
    const { id } = this.props;
    const valuesToSave = preSaveFormat(values, this.state.originalValues);

    console.log('valuesToSave', valuesToSave);

    const result = await updateSetting({
      variables: { id, values: valuesToSave },
    });

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
            render={({ handleSubmit, pristine, invalid, form }) => (
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
                        <AdCards
                          fields={fields}
                          initialValues={initialValues}
                          form={form}
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
