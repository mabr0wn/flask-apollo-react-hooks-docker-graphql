import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../components/core/Footer/Footer.jsx/index.js';

it('renders without crashing', () => {
  shallow(<Footer />)
});