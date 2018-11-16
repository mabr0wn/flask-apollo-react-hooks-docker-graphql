// React
import React from 'react';
// Redux
import { Values } from "redux-form-website-template";
// Local
import SignInForm from '../../containers/auth/login/SignInForm.jsx'

/**
 *  
 */
function SignIn() {
  return (
    <div style={{ padding: 150 }}>
      <SignInForm />
      <Values form="syncValidation" />
    </div>
  )
}

export default SignIn;