// React
import * as React from 'react';
import { Component } from 'react';
import { 
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
/* import promise from 'redux-promise';*/
import reduxThunk from 'redux-thunk';
// Local
import { AUTH_USER } from '../actions/types';
import reducers from '../reducers';
import routes from '../routes';

// Connect reduxThunk to middleware so I could dispatch actions.
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// store contains the state
const store = createStoreWithMiddleware(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

const token = localStorage.getItem('token');
// if user has a token - sign him in
if (token) {
    store.dispatch({ type: AUTH_USER });
    /* console.log(">>>> src/index.js:");	    
     * console.log("localStorage contains token, so sign user in.");    */
}

class App extends Component {
    /*
     * The `render()` function should be pure, meaning that it 
     * does not modify component state, it returns the same 
     * result each time it’s invoked, and it does not directly 
     * interact with the browser.  
     * =======================================================
     * Presentational component, will not worry about
     * how the applications works, but only care about how
     * our application will looks.
     */ 
    render() {
        return (
            <Provider store={store}>
            <div className="App">
                <div className="App-header">
                    <h2>Flask + React + Docker + GraphQL</h2>
                    <Router>
                        <div>
	                    <Route component={routes} />
                        </div>
                    </Router>
                </div>
            </div>
            </Provider>
        );
    }
}

export default App;