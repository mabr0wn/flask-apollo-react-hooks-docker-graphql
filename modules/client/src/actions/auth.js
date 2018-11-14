// Types
import { 
    AUTH_SIGNIN, 
    AUTH_SIGNOUT, 
    AUTH_ERROR, 
} from './types';

export const signinUser = (token) => {
    return (dispatch) => {
        (() => {
            dispatch({type: AUTH_SIGNIN})
            localStorage.setItem('token', token);
        })
        .catch(() => {
            dispatch(authErr('User did not authenticate.'));
       })
    }
  };

export const signupUser = (token) => {
    return (dispatch) => {
        (() => {
            dispatch({type: AUTH_SIGNIN})
            localStorage.setItem('token', token);
        })
        .catch(() => {
		    // if request is bad - add error to the state.
            dispatch(authErr('User with this username already exists'));       
        })
    }
}
  
export const signoutUser = () => {
    localStorage.removeItem('token');
    return {type: AUTH_SIGNOUT}
    };

export const authErr = (error) => {
    return {
	type: AUTH_ERROR,
	payload: error
    };
}

