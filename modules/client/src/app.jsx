import * as React from 'react';
import { Component } from 'react';
import axios from 'axios';



class App extends Component {
  constructor() { 
      super();
      this.getIndex();
    }  
    getIndex() {
          axios.get('http://localhost:4000')
           .then((res) => {console.log(res); })
           .catch((err) => { console.log(err); })
        }
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Flask + React + Docker + AWS</h2>
                </div>
            </div>
        );
    }
}

export default App;