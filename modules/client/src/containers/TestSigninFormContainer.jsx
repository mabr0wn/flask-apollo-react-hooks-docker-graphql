import React, { useState }from 'react';
import { 
	withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


import SyncSigninValidationForm from '../containers/auth/login/SyncSigninValiationForm';
import { signIn } from '../actions/auth';

function TestSigninFormContainer(props) {
    const [ errors, setErrors ] = useState('')

    const handleSubmit = (values) => {
        props.mutate({ variables: values })
        .then((resp) => {
            if (resp.data) {
            console.log('got data', resp);
            props.history.push('/');
            } else {
                setErrors('there is an error')
            }
        })
        .catch((err) => {
          console.log('there was an error sending the query', err);
        });
    }
  return (
    <div>
    <SyncSigninValidationForm 
        onSubmit={handleSubmit}
        errors={errors}
    />
    </div>
  )
}

const signInMutation = gql`
  mutation {
      createUser( input: {
          username: ""
      }) {
          user{
              id
              username
          }
      }
  }
`;

const SignInWithData = graphql(signInMutation)(withRouter(TestSigninFormContainer));

const mapDispatchToProps = (dispatch) => ({
  signInDispatcher(token) {
    dispatch(signIn(token));
  }
});

const SignInWithDataAndState = connect(
  null,
  mapDispatchToProps
)(SignInWithData);

export default SignInWithDataAndState;

