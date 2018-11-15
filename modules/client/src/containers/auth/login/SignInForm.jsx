// React
import React, { useState }from 'react';
// Redux
import { Values } from "redux-form-website-template";
// Apollo-GraphQL
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
// Local
import SignInValidationForm from '../../../components/Login/SignInValiationForm.jsx';
import '../../../styles/redux-form.css';


function SignInForm(props) {
     const [ errors, setErrors ] = useState({ errors: [] })
     const handleSubmit = (values) => {
        props.mutate({ variables: values })
        .then((resp) => {
            if (resp.data) {
            console.log(resp);
            props.history.push('/');
            } else {
                setErrors({
                    errors: resp.data
                });
            }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  return (
    <div>
    <SignInValidationForm 
        onSubmit={handleSubmit}
        errors={errors}
    />
    <Values form="syncValidation" />
    </div>
  )
}

const SIGNIN_MUTATION = gql`
    mutation SigninMutation($username: String!, $email: String!, $password: String!){
        login(username: $username, email: $email, password: $password){
            token
        }
    }
`
export default compose(
    graphql(SIGNIN_MUTATION, {name: 'signinMutation'})
)(SignInForm)
