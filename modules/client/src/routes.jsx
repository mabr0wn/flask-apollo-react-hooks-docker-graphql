import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Signin from './containers/auth/Signin.jsx';
import Blogs from './containers/blog/Blogs.jsx';

export default class routes extends Component {
  render() {
    return (
     <Router>
      <div>
      <Switch>
      <Route exact path="/" component={Blogs} />
	    <Route path="/login" component={Signin} />
      </Switch>
      </div>
      </Router>
    )
  }
}
