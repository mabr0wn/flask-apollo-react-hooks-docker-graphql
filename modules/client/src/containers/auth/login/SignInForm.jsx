// React
import React, { useState }from 'react';
// Redux
import { Field, reduxForm } from 'redux-form'
// Apollo
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
// Local
import '../../../styles/redux-form.min.css';
// Constant
export const AUTH_TOKEN = 'auth-token'

/**
 * 
 * @param {*} values 
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
 * @param {*} values 
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
 * @param {*} param0 
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
 * `SignInForm()` function to allow a given user
 * to login to the web app. using react hooks we 
 * can change the state of a given user. given a
 * nested function `handleSubmit()` and allow the
 * user to login upon click.
 */
function SignInForm(props) {
    const [ login, setLogin ] = useState(true)
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
      }
    const handleSubmit = async() => {
        try {
          // eslint-disable-next-line
          let auth_token = ''
          const result = await props.signinMutation({
            variables: {
              username,
              password
            }
          })
          console.log('Login results => ', result)
          const { token } = result.data.login
          auth_token = token
          saveUserData(token)
        } catch (err) {
          console.error('Error', err);
        }
      }
    // function for handling username change
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    // function for password change
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    // validations
    const { pristine, invalid, submitting } = props
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
          name="password"
          type="password"
          label="password"
          value={password}
          onChange={handlePasswordChange}
          component={renderField}
        />
    <div >
      <div type="submit" disabled={submitting || pristine || invalid} onClick={() => handleSubmit()}>
        {login ? 'login' : ''}
      </div>
      <div
        type="button"
        onClick={() => setLogin({login: !login })}>
          {login
          ? 'create an account?'
          : ''}
      </div>
    </div>
    </form>
    )
}

/**
 * 
 */
const SIGNIN_MUTATION = gql`
  mutation SigninMutation($username: String!, $password: String!){
    login(username: $username, password: $password){
        token
    }
  }
`
/**
 * 
 */
export default compose(
    graphql(SIGNIN_MUTATION, {name: 'signinMutation'}),
    reduxForm({
        form: 'syncValidation',  // a unique identifier for this form
        validate,                // <--- validation function given to redux-form
        warn                     // <--- warning function given to redux-form
    })
)(SignInForm)
