// Redux
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';


import BlogReducer from './reducer_blogs';
import authReducer from './reducer_auth';

const rootReducer = combineReducers({
    form: formReducer,
    blogs: BlogReducer,
    auth: authReducer
});

export default rootReducer;