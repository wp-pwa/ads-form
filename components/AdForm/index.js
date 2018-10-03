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
                <form onSubmit={handleSubmit}>
                  <FieldArray name="ads.fills">
                    {({ fields }) => (
                      <div>
                        <AdCards
                          fields={fields}
                          initialValues={initialValues}
                          form={form}
                        />
                        <AlignCenter>
                          <input
                            type="button"
                            className="small"
                            onClick={() =>
                              fields.push({ type: SMART_ADSERVER })
                            }
                            value="Create Ad"
                          />
                        </AlignCenter>
                      </div>
                    )}
                  </FieldArray>
                  <AlignRight>
                    <input
                      type="submit"
                      disabled={pristine || invalid}
                      className="primary large"
                      value="Save"
                    />
                  </AlignRight>
                </form>
              </div>
            )}
          />
        )}
      </Mutation>
    );
  }
}

export default AdForm;

const AlignCenter = styled.div`
  padding-top: 16px;
  display: flex;
  justify-content: center;
`;

const AlignRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;
