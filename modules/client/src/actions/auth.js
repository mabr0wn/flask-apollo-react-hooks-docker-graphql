// React
import { 
    BrowserRouter as Router 
} from 'react-router-dom';
// API
import axios from 'axios';
// Types
import { 
    AUTH_USER, 
    NONAUTH_USER, 
    AUTH_ERROR, 
    FETCH_MESSAGE 
} from './types';
/**
 * Gives us the host location and split at the colon.
 * `window.location.host` is hostname and port.
 */
const host = window.location.host.split(':')[0];
export const ROOT_URL = 'http://api.' + host + '/api/v1';

/**
 * `signinUser` will require you to sign up with
 * username and password currently using axios to 
 * fetch to the backend which is Flask and will
 * implement Flask-RESTful API. 
 * 
 */
export function signinUser({username, password}) {
    return function(dispatch) {
        console.log('>>> src/actions/auth.js');
        console.log('Sending POST request from signinUser.');
        axios.post(`${ROOT_URL}/auth/`, {username, password})
            .then(resp => {
                console.log('successfully signed in');
                dispatch({ type: AUTH_USER })
                console.log('Auth action dispatched(to flip auth state to true)')
                // save the jwt token
                localStorage.setItem('token', resp.data.token);
                console.log('TokenSaved')
                Router.push('/');
                console.log('redirected to Home.');
            })
            .catch(() => {
                dispatch(authError('did not auth error'))
            })
    };
}

export function signupUser({username, password}) {
    return function(dispatch) {
	// send username/password
	// .then - success, .catch - fail.
	axios.post(`${ROOT_URL}/signup`, {username, password})
	     .then(response => {
		 // if request is good
		 // - update state to indicate that I'm signed up
		 dispatch({ type: AUTH_USER});
		 // - save JWT token
		 localStorage.setItem('token', response.data.token);
		 // - redirect to /feature
		 Router.push('/');
	     })
	     .catch(() => {
		 // if request is bad - add error to the state.
		     dispatch(authError('User with this username already exists'));
	     })

    };
}

export function  signoutUser() {
    // delete token and signout
    console.log('>>>> src/actions/auth.js');
    console.log('Signin out user, deleting token from localStorage');
    localStorage.removeItem('token');
    console.log('Redirecting to /, and dispatching action NONAUTH_USER');
    Router.push('/');
    return {
        type: NONAUTH_USER
    };
}
export function authError(error) {
    return {
	type: AUTH_ERROR,
	payload: error
    };
}

export function fetchMessage() {
    const config = {
	headers:  { authorization: localStorage.getItem('token')}
    };
    
    return function(dispatch) {
	axios.get(ROOT_URL, config)
	     .then(response => {
		 /* console.log(response);*/
		 dispatch({
		     type: FETCH_MESSAGE,
		     payload: response.data.message
		 });
	     });
    }
}
