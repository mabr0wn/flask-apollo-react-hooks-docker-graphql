import React from 'react'
// Redux
import { Values } from "redux-form-website-template";
// Local
import SignUpForm from '../../containers/auth/register/SignUpForm.jsx';

function SignUp() {
  return (
    <div style={{ padding: 150 }}>
      <SignUpForm />
      <Values form="syncValidation" />
    </div>
  )
}

export default SignUp;
