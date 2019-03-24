// React
import React from 'react';
import { 
  Grid, 
  Nav 
} from 'react-bootstrap';

function Footer(/*props*/) {
  return (
    <footer>
      <Grid>
        <Nav justified>
          <Nav
            eventKey={1}>
            MIT LICENSE
          </Nav>
          <Nav
            eventKey={2}
            title="Item">
            <a href="https://opensource.org/licenses/MIT" target="blank">Terms & Conditions</a>
          </Nav>
          <Nav
            eventKey={2}>
            <a href="https://mbrown.me/" target="blank">mbrown.me</a>
          </Nav>
        </Nav>

        <div className="text-center small copyright">
          © MDB 2018
        </div>
      </Grid>
    </footer>
  );
}

export default Footer;