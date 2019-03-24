import {GET_USERS_BLOGS} from '../queries';

it('should be the correct query', () => {
    expect(GET_USERS_BLOGS).toMatchSnapshot();
});