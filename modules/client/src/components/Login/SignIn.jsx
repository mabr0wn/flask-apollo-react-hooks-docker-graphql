// React
import React from 'react';
// Redux
import { Values } from "redux-form-website-template";
// Local
import SignInForm from '../../containers/auth/login/SignInForm.jsx'
import showResults from '../../showResults';


/**
 *  
 */
function SignIn() {
  return (
    <div style={{ padding: 150 }}>
      <SignInForm onSubmit={showResults}/>
      <Values form="syncValidation" />
    </div>
  )
}

export default SignIn;