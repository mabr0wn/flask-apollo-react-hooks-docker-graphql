// React
import { 
	BrowserRouter as Router 
} from 'react-router-dom';
// API
import axios from 'axios';
// Types
import {
	LOAD_BLOGS,
	LOAD_BLOGS_SUCCESS,
	LOAD_BLOGS_FAILURE,
	LOAD_BLOG,
	CREATE_BLOG,
	DELETE_BLOG,
	DELETE_BLOG_SUCCESS,
	DELETE_BLOG_FAILURE
} from './types';


export const SERVER_URL = 'http://localhost:4000';

export const loadBlogs = () => {
    return (dispatch) => {
		return axios({
			method: 'get',
			url: `${SERVER_URL}/blogs`,
			headers: []
		  })
		  .then(results => results.json())
		  .then(data => {
			  dispatch({
				type: LOAD_BLOGS,
				payload: data.data
			  });
		  });
		}	
	}

export const loadBlogsSuccess = (blogs)  => {
	return dispatch => {
		dispatch({
		  type: LOAD_BLOGS_SUCCESS,
		  payload: blogs
		});
	}
}
	  
export const loadBlogsFailure = (error) => {
	return dispatch => {
		dispatch({
		  type: LOAD_BLOGS_FAILURE,
		  payload: error
		});
	}
}
	  

export const loadBlog = (id) => {
	return (dispatch) => {
		return axios({
			method: 'get',
			url: `${SERVER_URL}/blogs/${id}`,
			headers: []
		})
		.then(results => results.json())
		.then(data => {
			dispatch({
				type: LOAD_BLOG,
				payload: data.id
			});
		});
	}
}


export const createBlog = (props) => {
    return (dispatch) => {
		axios({
			method: 'post',
			data: props,
			url: `${SERVER_URL}/blog/new`,
			headers: { 
				authorization: 'Token ' + localStorage.getItem('token')
			}
		  })
		  .then(resp => {
			 Router.push('/');
			 dispatch({
			     type: CREATE_BLOG,
			     payload: resp
			 });
		});
  }
}

export const deleteBlog = (id) => {
    return (dispatch) => {    
		axios({
			method: 'delete',
			url: `${SERVER_URL}/blog/${id}/`,
			headers:  { 
				authorization: 'Token ' + localStorage.getItem('token')
			}
		})
		.then(resp => {
		Router.push('/');		 
		dispatch({
		    type: DELETE_BLOG,
		    payload: resp
			});
		});
  }   
}

export const deleteBlogSuccess = (deletedBlog) => {
	return dispatch => {
		dispatch({
		  type: DELETE_BLOG_SUCCESS,
		  payload: deletedBlog
		});
	}
}
  
export const deleteBlogFailure = (resp) => {
	return dispatch => {
		dispatch({
		  type: DELETE_BLOG_FAILURE,
		  payload: resp
		});
	}
}
  
