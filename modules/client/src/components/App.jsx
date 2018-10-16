// React
import * as React from 'react';
import { Component } from 'react';
// Local
import Blogs  from '../containers/Blogs';



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
            <div className="App">
                <div className="App-header">
                    <h2>Flask + React + Docker + GraphQL</h2>
                    <Blogs />
                </div>
            </div>
        );
    }
}

export default App;