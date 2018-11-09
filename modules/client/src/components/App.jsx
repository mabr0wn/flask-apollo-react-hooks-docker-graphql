// React
import React from 'react';
import { 
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
// Local
import Routes from '../Routes.jsx';
import store from '../store/store';
/*
 * =======================================================
 * Presentational React functional Component, will not worry about
 * how the applications works, but only care about how
 * our application will looks.
 * =======================================================
 */ 
const App = ()  => {
    return (
        <Provider store={store}>
                <div className="container">
                    <h2>Flask + React + Docker + GraphQL with Hooks</h2>
                    <div className="flex-row">
				        <div className="flex-large">
					     <h2>Add Blog</h2>
				        </div>
				    <div className="flex-large">
					    <h2>View blogs</h2>
				    </div>
			        </div>
                    <Router>
                        <div>
	                    <Route component={Routes} />
                        </div>
                    </Router>
                </div>
        </Provider>
    );
}

export default App;