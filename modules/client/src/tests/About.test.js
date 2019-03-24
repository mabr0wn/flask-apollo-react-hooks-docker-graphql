import React from 'react';
import renderer from 'react-test-renderer';

import About from '../components/core/About.jsx';

it('renders without crashing', () => {
    const tree = renderer.create(<About />).toJSON();
    expect(tree).toMatchSnapshot();
  });