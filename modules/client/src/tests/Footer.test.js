import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../components/core/Footer.jsx';

it('renders without crashing', () => {
  shallow(<Footer />)
});