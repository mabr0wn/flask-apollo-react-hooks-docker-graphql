import {
    AUTH_SIGNIN,
    AUTH_SIGNOUT
  } from '../actions/auth';
  
  const initialState = {
    authenticated: ''
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case AUTH_SIGNIN:
        return { ...state, authenticated: 'Authed!' };
      case AUTH_SIGNOUT:
        return { ...state, authenticated: 'Not Authed!' };
      default:
        return state;
    }
  };
// // Types
// import { 
//     AUTH_USER, 
//     NONAUTH_USER, 
//     AUTH_ERROR, 
//     LOAD_MESSAGE 
// } from '../actions/types';

// const initialState = {
//     error: '',
//     authenticated: false 
//   };

//  const authReducer = (state=initialState, action) => {
//     switch(action.type) {
// 	    case AUTH_USER:
// 	        return {
//                 ...state, 
//                 error: '', 
//                 authenticated: true 
//             };
// 	    case NONAUTH_USER:
// 	        return {
//                 ...state, 
//                 error: '', 
//                 authenticated: false 
//             };
// 	    case AUTH_ERROR:
// 	        return {
//                 ...state, 
//                 error: action.payload 
//             };
// 	    case LOAD_MESSAGE:
//             return {
//                 ...state, 
//                 message: action.payload 
//             };
//     default:
// 	    return state;        
//     }
// }

// export default authReducer;