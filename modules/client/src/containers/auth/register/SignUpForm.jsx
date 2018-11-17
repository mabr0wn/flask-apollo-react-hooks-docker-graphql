// React
import React, { useState }from 'react';
// Redux
import { Field, reduxForm } from 'redux-form'
// Apollo
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
// Local
import '../../../styles/redux-form.css';
// Constant
export const AUTH_TOKEN = 'auth-token'

/**
 * 
 * @param {*} values the required input from
 * the end user when signing up fora form.  if the 
 * user does not meet the requirements they will be prompted with
 * a returned string error.
 */
const validate = values => {
    const errors = {}
    if (!values.username) {
      errors.username = 'Required'
    } else if (values.username.length > 15) {
      errors.username = 'Must be 15 characters or less'
    }
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if (!values.password) {
      errors.password = 'Required'
    } else if (!/^[a-zA-Z]\w{3,14}$/i.test(values.password)) {
      errors.password = 'Password is invalid'
    } else if (values.password.length < 6) {
      errors.password = 'Password must be atleast 6 characters, please try again!'
    }
    return errors
  }

/**
 * 
 * @param {*} values the user will be prompted with
 * with a warning message which will still allow them to
 * proceed.
 */
const warn = values => {
    const warnings = {}
    if (values.password < 8) {
      warnings.password = 'It is recommended to user passwords length of atleast 8 characters.'
    }
    return warnings
    }

/**
 * 
 * @param {*} param 
 */
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type}/>
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )
/**
 * React Hooks for state, `SignUpForm()` allows a given end user 
 * to sign up using the redux-form pattern.  can track the process
 * of any errors, warnings, or success.  created token for allow the 
 * the customer to stay authed while visited the web app.
 */
function SignUpForm(props) {
    // eslint-disable-next-line
    const [ createUser, setCreateUser ] = useState(true)
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
      }
    const handleSubmit = () => {
        let auth_token = ''
          const result = props.signupMutation({
            variables: {
              username,
              email,
              password
            }
          })
          console.log('createUser results => ', result)
          const { token } = result.data.createUser
          auth_token = token
          saveUserData(token)
         
        if (auth_token.length > 0){
            console.log('ok');
        }
      }
    // function for handling email change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    // function for handling username change
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    // function for handling password change
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }
    // validations...
    const { pristine, invalid, reset, submitting } = props
    return (
    <form>
        <Field
          name="username"
          type="text"
          label="username"
          value={username}
          onChange={handleUsernameChange}
          component={renderField}
        />
        <Field
          name="email" 
          type="text"
          label="email"
          value={email}
          onChange={handleEmailChange}
          component={renderField}
        />
        <Field
          name="password"
          type="password"
          label="password"
          value={password}
          onChange={handlePasswordChange}
          component={renderField}
        />
        <Field
          name="confirm password"
          type="password"
          label="confirm password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          component={renderField}
        />
    <div >
      <div 
        type="submit" 
        disabled={submitting || pristine || invalid} 
        onClick={() => handleSubmit()}>
        {createUser ? 'Create' : ''}
      </div>
      <div
        type="button"
        disabled={pristine || submitting}
        onClick={reset}>
        Clear Values
      </div>
    </div>
    </form>
    )
}
/**
 * GraphQL mutation for creating a user.
 */
const SIGNUP_MUTATION = gql`
  mutation SignUpMutation($email: String!, $password: String!, $name:String!){
    createUser(email: $email, password: $password, name: $name){
      token
    }
  }
`

/**
 * compose to combine multiple exports...
 */
export default compose(
    graphql(SIGNUP_MUTATION, {name: 'signupMutation'}),
    reduxForm({
        form: 'syncValidation',  // a unique identifier for this form
        validate,                // <--- validation function given to redux-form
        warn                     // <--- warning function given to redux-form
    })
)(SignUpForm)
