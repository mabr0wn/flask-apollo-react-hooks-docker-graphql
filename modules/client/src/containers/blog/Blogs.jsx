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
    // Declare a new state variable, which we'll call "value"
    const [ blogs ] = useState(blogsData)
    const BlogTable = props => (
        <table>
          <thead>
            <tr>
              <th>title</th>
              <th>body</th>
            </tr>
          </thead>
          <tbody>
            {props.blogs.length > 0 ? (
              props.blogs.map(blog => (
                <tr key={blog.id}>
                  <td>{blog.title}</td>
                  <td>{blog.body}</td>
                  <td>
                    <button
                      // onClick={() => {
                      //   props.editRow(user)
                      // }}
                      className="button muted-button"
                    >
                      Edit
                    </button>
                    <button
                      // onClick={() => props.deleteUser(user.id)}
                      className="button muted-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No blogs</td>
              </tr>
            )}
          </tbody>
        </table>
    )
    return (
        <div className="container"> 
            <BlogTable blogs={blogs}/>
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