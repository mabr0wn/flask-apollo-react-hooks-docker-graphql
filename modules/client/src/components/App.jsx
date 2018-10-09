// React
import * as React from 'react';
import { Component } from 'react';



class App extends Component {
  // eslint-disable-next-line
  constructor() { 
      super();

    }
    /*
     * The `render()` function should be pure, meaning that it 
     * does not modify component state, it returns the same 
     * result each time it’s invoked, and it does not directly 
     * interact with the browser.  
     */ 
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Flask + React + Docker + GraphQL</h2>
                </div>
            </div>
        );
    }
}

export default App;