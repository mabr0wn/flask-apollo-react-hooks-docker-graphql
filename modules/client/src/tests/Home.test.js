import React from 'react';
import { shallow } from 'enzyme';

import Home from '../components/core/Home.jsx';

it('renders without crashing', () => {
  shallow(<Home />)
});