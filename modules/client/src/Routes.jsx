// React
import React from 'react'
import { 
  Nav,
  Navbar,
  NavItem
 } from 'react-bootstrap';
import { 
  IndexLinkContainer 
} from 'react-router-bootstrap';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
// Local
import Blogs from './containers/blog/Blogs.jsx';
import SignIn from './components/auth/login/SignIn.jsx';
import SignUp from './components/auth/register/SignUp.jsx';
import Footer from './components/core/Footer';

function Routes() {
  return (
        <Router>
        <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Blogs</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
            <IndexLinkContainer to="/login">
              <NavItem eventKey={1}>
                Login
              </NavItem>
              </IndexLinkContainer>
              <IndexLinkContainer to="/register">
              <NavItem eventKey={2}>
                Register
              </NavItem>
              </IndexLinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Blogs} />
	        <Route path="/login" component={SignIn}/>
          <Route path="/register" component={SignUp}/>
        </Switch>
        <Footer></Footer>
        </div>
      </Router>
    )
}

export default Routes;
