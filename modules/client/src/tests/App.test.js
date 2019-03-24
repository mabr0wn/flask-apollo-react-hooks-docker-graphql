import React from 'react';
import { shallow } from 'enzyme';

import App from '../App.jsx';

it('renders without crashing', () => {
  shallow(<App />)
});