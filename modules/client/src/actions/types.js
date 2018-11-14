
/**
 * Actions are payloads of information from your application to your store.
 * they are the only source of information for your store. you send them
 * using the `store.dispatch()`
 * ========================================================================
 * Here we define a exported action to add some blogs.
 * using the arrow syntax we can cut out writing 
 * the word function and use `=>` instead.
 * =========================================================================
 *::NOTE:: == You don't have to define action type constants in a separate file, 
 * or even to define them at all. For a small project, it might be easier to just 
 * use string literals for action types. However, there are some benefits to explicitly 
 * declaring constants in larger codebases. Read https://redux.js.org/recipes/reducingboilerplate
 * for more practical tips on keeping your codebase clean.
 * 
 */
//BLOG list
export const LOAD_BLOGS = 'LOAD_BLOGS';
export const LOAD_BLOGS_SUCCESS = 'LOAD_BLOGS_SUCCESS';
export const LOAD_BLOGS_FAILURE = 'LOAD_BLOGS_FAILURE';

//Create new BLOG
export const CREATE_BLOG = 'CREATE_BLOG';
export const CREATE_BLOG_SUCCESS = 'CREATE_BLOG_SUCCESS';
export const CREATE_BLOG_FAILURE = 'CREATE_BLOG_FAILURE';

// Update BLOG
export const UPDATE_BLOG = 'UPDATE_BLOG';
export const UPDATE_BLOG_SUCCESS = 'UPDATE_BLOG_SUCCESS';
export const UPDATE_BLOG_FAILURE = 'UPDATE_BLOG_FAILURE';

//Validate BLOG fields like Title, Categries on the server
export const VALIDATE_BLOG_FIELDS = 'VALIDATE_BLOG_FIELDS';
export const VALIDATE_BLOG_FIELDS_SUCCESS = 'VALIDATE_BLOG_FIELDS_SUCCESS';
export const VALIDATE_BLOG_FIELDS_FAILURE = 'VALIDATE_BLOG_FIELDS_FAILURE';

//LOAD BLOG
export const LOAD_BLOG = 'LOAD_BLOG';
export const LOAD_BLOG_SUCCESS = 'LOAD_BLOG_SUCCESS';
export const LOAD_BLOG_FAILURE = 'LOAD_BLOG_FAILURE';

//Delete BLOG
export const DELETE_BLOG = 'DELETE_BLOG';
export const DELETE_BLOG_SUCCESS = 'DELETE_BLOG_SUCCESS';
export const DELETE_BLOG_FAILURE = 'DELETE_BLOG_FAILURE';

// Auth Types
export const AUTH_SIGNIN = 'AUTH_SIGNIN';
export const AUTH_SIGNOUT = 'AUTH_SIGNOUT';
export const AUTH_ERROR = 'AUTH_ERROR';
