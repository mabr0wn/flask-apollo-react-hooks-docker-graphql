// React
import React from 'react';
// Values
import { Values } from "redux-form-website-template";
// Local
import SyncSigninValidationForm from '../../containers/auth/login/SyncSigninValiationForm.jsx';
import showResults from '../../showResults.js'
import '../../styles/redux-form.css'

/**
 *  
 */
function Signin() {
  return (
    <div style={{ padding: 15 }}>
      <h2>Synchronous Validation</h2>
      <SyncSigninValidationForm onSubmit={showResults}/>
      <Values form="syncValidation" />
    </div>
  )
}

export default Signin;