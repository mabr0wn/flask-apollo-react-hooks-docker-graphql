
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
// Blog Types
export const FETCH_BLOGS = 'FETCH_BLOGS';
export const FETCH_BLOG = 'FETCH_BLOG';
export const CREATE_BLOG = 'CREATE_BLOG';
export const DELETE_BLOG = 'DELETE_BLOG';
export const UPDATE_BLOG = 'UPDATE_BLOG';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_SETTINGS = 'FETCH_SETTINGS';
export const CREATE_SUBSCRIBER = 'CREATE_SUBSCRIBER';
// Auth Types
export const AUTH_USER = 'AUTH_USER';
export const NONAUTH_USER = 'NONAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const FETCH_MESSAGE = 'FETCH_MESSAGE';

