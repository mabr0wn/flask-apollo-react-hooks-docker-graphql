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
import Footer from './core/Footer.jsx';

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
                <div>
                    <Router>
                        <div>
	                    <Route component={Routes} />
                        <Footer></Footer>
                        </div>
                    </Router>
                </div>
        </Provider>
    );
}

export default App;