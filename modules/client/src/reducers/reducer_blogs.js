// Types
import { 
	FETCH_BLOG,
	FETCH_BLOGS
 } from '../actions/types';

/* List of all posts and an active post  */
const INITIAL_STATE = {
    all: [],
    blog: null
};

export default function(state=INITIAL_STATE, action) {
    switch(action.type) {
	case FETCH_BLOG:
	    return {...state, post: action.payload.data };
	case FETCH_BLOGS:
	    /* Action returns a list of posts */
	    /* And this adds them to the state */
	    /* (creating a new state object out of old state and new posts) */
	    return {...state, all: action.payload.data};
	default:
	    return state;
    }
}