// Types
import { 
    AUTH_USER, 
    NONAUTH_USER, 
    AUTH_ERROR, 
    LOAD_MESSAGE 
} from '../actions/types';

const initialState = {
    error: '',
    authenticated: false 
  };

 const authReducer = (state=initialState, action) => {
    switch(action.type) {
	    case AUTH_USER:
	        return {
                ...state, 
                error: '', 
                authenticated: true 
            };
	    case NONAUTH_USER:
	        return {
                ...state, 
                error: '', 
                authenticated: false 
            };
	    case AUTH_ERROR:
	        return {
                ...state, 
                error: action.payload 
            };
	    case LOAD_MESSAGE:
            return {
                ...state, 
                message: action.payload 
            };
    default:
	    return state;        
    }
}

export default authReducer;