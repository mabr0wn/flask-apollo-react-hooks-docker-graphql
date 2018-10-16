import { 
    LIST_BLOGS, 
    ENUMERATE_BLOGS 
} from '../actions/blogs';

const initialState = {
    blogs: []
}

function blogReducer(state = initialState, action) {
    switch(action.type) {
        case ENUMERATE_BLOGS:
            /** the `Object.assign()` will create an copy(reference) of the state. 
             *  keep in mind you must add an empty object as the first param
             *  or it will mutate the first arg(blogs in this case)
             *  can also enable spread syntax `...state` `...newState`
             */ 
            return Object.assign({}, state, {
                blogs: [
                    ...state.blogs,
                    {
                        text: text.action
                    }
                ]
            })
        case LIST_BLOGS: {
            return Object.assign({}), state, {
                blogs: state.blogs.map((blog, index) => {
                    if (index === action.index) {

                    }
                })
            }
        }

        // important to return the previous `state`, for any unknown actions. 
        default:
            return state
    }


}
