// Redux
import { 
    createStore, 
    combineReducers, 
    applyMiddleware  
} from 'redux';
import reduxThunk from 'redux-thunk';
import { reducer as reduxFormReducer } from 'redux-form';
// Local
import { AUTH_USER } from '../actions/types';
import BlogReducer from '../reducers/blogs';
import authReducer from '../reducers/auth';

// combine all our reducers into one reducers as the app grows this will be useful.
const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  blogs: BlogReducer,
  auth: authReducer
});

// Connect reduxThunk to middleware so I could dispatch actions.
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// store contains the state
const store = createStoreWithMiddleware(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

const token = localStorage.getItem('token');
if (token) {
    store.dispatch({ type: AUTH_USER });
}

export default store;
