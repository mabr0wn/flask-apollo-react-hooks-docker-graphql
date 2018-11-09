// Types
import { 
	LOAD_BLOG,
	LOAD_BLOGS
 } from '../actions/types';


const initialState = {
    blogs: [],
    blog: null
};

const blogReducer = (state=initialState, action)  => {
    switch(action.type) {
		case LOAD_BLOG:
	    	return {
				...state, 
				blog: action.payload.data 
			};
		case LOAD_BLOGS:
	    	return {
				...state, 
				blogs: action.payload.data
			};
	default:
	    return state;
    }
}

export default blogReducer;