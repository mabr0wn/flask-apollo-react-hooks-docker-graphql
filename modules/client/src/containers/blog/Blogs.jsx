// React
import React, { useState } from 'react';
import { 
    connect 
} from 'react-redux';
// Local
import {  
    loadBlogs 
} from '../../actions/blogs';
import Blog from './Blog.jsx';

/**
 * This is container class which will do all the heavy lifting,
 * will import this into our presentational component App.js
 * ============================================================
 * Disregarding for some testing with
 * hooks, will implement back in soon,
 * for now DO NOT USE!!!
 */
// eslint-disable-next-line
const blogsData = (blogs, props) => {
    /**
     * If there are no blogs in the state
     * render an empty div tag
     */
    if (!blogs) {
        return (
           <div></div>
        );
    };
    return blogs.map((blog) => {
        if (blog.published || props.authenticated) {
            /** 
             * Generate the list of blogs. 
             * Published blogs ar visiable to all
             * authenticated user can see both published and drafts
             */
            return (
                <Blog key={blog.slug}
                      title={blog.title}
                      slug={blog.slug}
                      body={blog.body}
                      published={blog.published}
                      authenticated={props.authenticated}
                      category={blog.category}
                      tags={blog.tags}
                      cut={100}
                      link={`/blog/${blog.slug}`}/>
            )
        } else {
            return (
                <Blog key={blog.slug}
                title={blog.title}
                slug={blog.slug}
                body={blog.body}
                category={blog.category}
                tags={blog.tags}
                link={`/blog/${blog.slug}`}/>
            );
        }
    });
}

function Blogs()  { 
    // Dummy Data for blogs testing
    const blogsData = [
        { 
          id: 1, 
          title: 'Introducing Hooks', 
          body: `Hooks are a new feature 
          proposal that lets you use state and 
          other React features without writing a class. 
          They’re currently in React v16.7.0-alpha. ` 
        },
    		{ 
          id: 2, 
          title: 'Introducing Redux-form', 
          body: 'Is the form pattern of redux pattern ' 
        },
    		{ 
          id: 3, 
          title: 'Redux', 
          body: `Redux is a predictable state container for 
          JavaScript apps. It helps you write applications 
          that behave consistently, run in different environments 
          (client, server, and native), and are easy to test. 
          On top of that, it provides a great developer experience.`
        },
    ] 
    // Declare a new state variable, which we'll call "blogs"
    const [ blogs ] = useState(blogsData)
    const BlogContainer = props => (
      <div className="container mt-4">

      <div className="jumbotron mb-3 pb-2 pt-3">
        <h1 className="display-4">Blog App</h1>
        <p className="lead">This is a simple Blog list dummy data application that uses localStorage to store data permanently.</p>
        <hr className="my-4" />
        {props.blogs.length > 0 ? (
              props.blogs.map(blog => (
                <div key={blog.id}>
                  <h1>{blog.title}</h1>
                  <p>{blog.body}</p>
                </div>
              ))
            ) : (
              <div>
                <h1 colSpan={3}>No blogs</h1>
              </div>
            )}
        <a className="btn btn-danger btn-md" id="destroy" href="{}">Destroy</a>
        <a className="btn btn-info btn-md" id="edit" href="{}">Edit</a>
        <hr className="my-4" />
      </div>
  
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Type your blog here..." />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" id="button-addon2">Add</button>
        </div>
      </div>
  
      <ul className="list-group mb-4">
      </ul>
  
    </div>
    )
    return (
        <div className="container"> 
            <BlogContainer blogs={blogs}/>
        </div>
    ); 
}

function mapStateToProps(state) {
    return { 
        blogs: state.blogs.all,
               authenticated: state.auth.authenticated
            };
}
/** connects redux state to the component,
 * allowing to access it with "this.props.blogs"
 * then connects the actions(fetchBlogs) to the component,
 * allowing me to fire them like "this.props.fetchBlogs()" 
 * */
export default connect(mapStateToProps, { loadBlogs })(Blogs);