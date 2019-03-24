import React from 'react';
import { shallow } from 'enzyme';

import Home from '../Home.jsx';

it('renders without crashing', () => {
  const wrapper = shallow(<Home />)
  expect(wrapper).toMatchSnapshot();
});