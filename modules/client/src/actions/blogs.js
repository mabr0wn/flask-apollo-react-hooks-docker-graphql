// React
import { 
	BrowserRouter as Router 
} from 'react-router-dom';
// API
import axios from 'axios';
// Types
import {
	FETCH_BLOGS,
	FETCH_BLOG,
	CREATE_BLOG,
	DELETE_BLOG,
	UPDATE_BLOG,
	FETCH_CATEGORIES,
	FETCH_SETTINGS,
	CREATE_SUBSCRIBER
} from './types';


const host = window.location.host.split(':')[0];
export const ROOT_URL = 'http://api.' + host + '/api/v1';

export function fetchBlogs(filter) {
    var blogs_url = `${ROOT_URL}/blogs/`;
    var page_url = "";
    if (filter) {
	if (filter.currentPage) {
	    page_url = "?page=" + filter.currentPage;
	}
	if (filter.category) {
	    /* blogs filtered by category */
	    blogs_url = `${ROOT_URL}/category/${filter.category}`
	}
	if (filter.tag) {
	    /* blogs filtered by tag */
	    blogs_url = `${ROOT_URL}/tag/${filter.tag}`
	}
    }
    const url = blogs_url + page_url;
    /* console.log("Fetching blogs"); */
    return function(dispatch) {
	axios.get(url)
	     .then(response => {
		 /* console.log(">>>> src/actions/index.js (promise):");*/
		 /* console.log("Successfully fetched blogs.Dispatching action FETCH_BLOGS");*/
		 dispatch({
		     type: FETCH_BLOGS,
		     payload: response
		 });
	     });
    };
}

export function fetchBlog(slug) {
    /* console.log(">>>> src/actions/index.js:");
     * console.log("Fetching blog.");	    */
    
    return function(dispatch) {    
	axios.get(`${ROOT_URL}/blog/${slug}/`)
	     .then(response => {
		 /* console.log("Successfully fetched blog.");
		    console.log(response.data.body);*/
		 
		 dispatch({
		     type: FETCH_BLOG,
		     payload: response
		 });
	     });
    };
}


export function createBlog(props) {
    // Get the saved token from local storage
    const config = {
	headers:  { authorization: 'Token ' + localStorage.getItem('token')}
    };

    return function(dispatch) {
	axios.blog(`${ROOT_URL}/blog/new`, props, config)
	     .then(response => {
		 Router.push('/');
		 /* console.log(response);*/
		 dispatch({
		     type: CREATE_BLOG,
		     payload: response
		 });
	     });
    }
}


export function updateBlog(slug, blog) {
    /* console.log(">>>> src/actions/index.js:");
     * console.log("Getting a token from localStorage. ");	    */

    /* Get the saved token from local storage */
    const config = {
	headers:  { authorization: 'Token ' + localStorage.getItem('token')}
    };

    /* console.log("Blog Tags: " + blog.tags);*/

    return function(dispatch) {
	axios.put(`${ROOT_URL}/blog/${slug}/`, blog, config)
	     .then(response => {
		 /* console.log(">>>> src/actions/index.js (promise):");
		 console.log("Updated a blog. Redirecting to it.");  */
		 Router.push('/blog/' + response.data.slug);
		 /* console.log(response);*/
		 dispatch({
		     type: UPDATE_BLOG,
		     payload: response
		 });
	     });
    }
}

export function deleteBlog(slug) {
    /* console.log(">>>> src/actions/index.js:");
     * console.log("Deleting blog.");	    */

    const config = {
	headers:  { authorization: 'Token ' + localStorage.getItem('token')}
    };
    
    return function(dispatch) {    
	axios.delete(`${ROOT_URL}/blog/${slug}/`, config)
	     .then(response => {
		 console.log(">>>> src/actions/index.js (promise):");
		 console.log("Successfully deleted blog. Dispatching action DELETE_BLOG.");
		 Router.push('/');		 
		 dispatch({
		     type: DELETE_BLOG,
		     payload: response
		 });
	     });
    };
    
}



export function fetchCategories() {
    return function(dispatch) {    
	axios.get(`${ROOT_URL}/categories/`)
	     .then(response => {
		 /* console.log("Categories fetched: " + response);*/
		 dispatch({
		     type: FETCH_CATEGORIES,
		     payload: response
		 });
	     });
    };
}

export function fetchSettings() {
    return function(dispatch) {    
	axios.get(`${ROOT_URL}/settings/`)
	     .then(response => {
		 /* console.log("Settings fetched: " + JSON.stringify(response));*/
		 dispatch({
		     type: FETCH_SETTINGS,
		     payload: response
		 });
	     });
    };
}


export function createSubscriber(props) {
    return function(dispatch) {
	axios.blog(`${ROOT_URL}/subscribe`, props)
	     .then(response => {
		 /* browserHistory.push('/');*/
		 /* console.log(response);*/
		 dispatch({
		     type: CREATE_SUBSCRIBER,
		     payload: response
		 });
	     });
    }
}


export function subscribedClose() {
    return {
	type: 'SUBSCRIBED_CLOSE',
	payload: false
    }
}