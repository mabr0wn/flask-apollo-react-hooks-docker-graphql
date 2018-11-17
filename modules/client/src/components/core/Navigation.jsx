import React from 'react';
import { 
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem
 } from 'react-bootstrap';
function Navigation() {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem>

        </NavItem>
        <NavItem>

        </NavItem>
        <NavDropdown>
          <MenuItem></MenuItem>
          <MenuItem></MenuItem>
          <MenuItem></MenuItem>
        </NavDropdown>
      </Nav>

    </Navbar>

  )
}

export default Navigation;