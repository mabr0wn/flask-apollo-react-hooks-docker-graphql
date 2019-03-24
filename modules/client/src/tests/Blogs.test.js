import React from 'react';
import { shallow } from 'enzyme';

import Blogs from '../containers/blog/Blogs.jsx';



it('should render a Blog component correctly', () => {

    const data = { blog: [{ id: '123', titile: 'test', text: 'test text' }] };
    const wrapper = shallow(
        <Blogs data={data} />,
    );

    expect(wrapper).toMatchSnapshot();
});