// Redux
import { 
    createStore, 
    combineReducers, 
    applyMiddleware  
} from 'redux';
import reduxThunk from 'redux-thunk';
import { reducer as reduxFormReducer } from 'redux-form';
// Local
import authReducer from '../reducers/auth';

// combine all our reducers into one reducers as the app grows this will be useful.
const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  auth: authReducer
});

// Connect reduxThunk to middleware so I could dispatch actions.
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// store contains the state
const store = createStoreWithMiddleware(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

export default store;
