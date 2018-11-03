// React
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
// Local
import Blogs from './containers/blog/Blogs.jsx';
import Signin from './components/Login/Signin.jsx';



function routes() {
  return (
     <Router>
        <div>
        <Switch>
          <Route exact path="/" component={Blogs} />
	        <Route path="/login" component={Signin}/>
        </Switch>
        </div>
      </Router>
    )
}

export default routes;
