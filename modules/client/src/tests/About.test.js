import React from 'react';
import ReactDOM from 'react-dom';
import About from '../components/core/About.jsx';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<About />, div);
    ReactDOM.unmountComponentAtNode(div);
  });