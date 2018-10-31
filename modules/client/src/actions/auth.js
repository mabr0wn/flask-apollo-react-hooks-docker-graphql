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
export const BACKEND_URL = 'http://api.' + host + '/api/v1';
/**
 * `signinUser` will require you to sign up with
 * username and password currently using axios to 
 * fetch to the backend which is Flask and will
 * implement Flask-RESTful API. 
 * 
 */
export function signinUser({username, password}) {
    return function(dispatch) {
        axios.post(`${BACKEND_URL}/auth/`, {username, password})
            .then(resp => {
                dispatch({ type: AUTH_USER })
                // save the jwt token
                localStorage.setItem('token', resp.data.token);
                Router.push('/');
            })
            .catch(() => {
                dispatch(authErr('User did not authenticate.'))
            })
    };
}
/**
 * `signupUser()` will allow a user to signup
 * with a username and password, the function will
 * return a dispatch and send the username/password
 * to the backend using `axios()`then resp with the 
 * dispatch fuction and update the user to AUTH_USER
 * and idicate I have signed up.
 */
export function signupUser({username, password}) {
    return function(dispatch) {
	    axios.post(`${BACKEND_URL}/signup`, {username, password})
	        .then(resp => {
		        dispatch({ type: AUTH_USER});
		        // save JWT token
		        localStorage.setItem('token', resp.data.token);
		        // - redirect to '/'
		        Router.push('/');
	        })
	        .catch(() => {
		        // if request is bad - add error to the state.
		        dispatch(authErr('User with this username already exists'));
	     })

    };
}

export function signoutUser() {
    // delete token and signout
    localStorage.removeItem('token');
    Router.push('/');
    return {
        type: NONAUTH_USER
    };
}
export function authErr(error) {
    return {
	type: AUTH_ERROR,
	payload: error
    };
}

export function fetchMessage() {
    const config = {
	headers:  { 
        authorization: localStorage.getItem('token')
        }
    };
    
    return function(dispatch) {
	    axios.get(BACKEND_URL, config)
	        .then(resp => {
		        dispatch({
		        type: FETCH_MESSAGE,
		        payload: resp.data.message
		        });
	        });
    }
}
