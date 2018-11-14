// React
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
// Local
import Blogs from './containers/blog/Blogs.jsx';
import SignIn from './components/Login/SignIn.jsx';



function Routes() {
  return (
     <Router>
        <div>
        <Switch>
          <Route exact path="/" component={Blogs} />
	        <Route path="/login" component={SignIn}/>
        </Switch>
        </div>
      </Router>
    )
}

export default Routes;
