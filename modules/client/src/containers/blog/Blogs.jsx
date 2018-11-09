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
import '../../styles/blog.css';

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
          They’re currently in React v16.7.0-alpha,
          They’re currently in React v16.7.0-alpha..` 
        },
    	{ 
          id: 2, 
          title: 'Introducing Redux-form', 
          body:  `redux-form primarily consists of three things: 
          A Redux reducer that listens to dispatched redux-form actions 
          to maintain your form state in Redux. A React component decorator 
          that wraps your entire form in a Higher Order Component (HOC) and 
          provides functionality via props.` 
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
        { 
          id: 4, 
          title: 'GraphQL', 
          body: `GraphQL is an open-source data query and manipulation 
          language, and a runtime for fulfilling queries with existing 
          data. GraphQL was developed internally by Facebook in 2012
          before being publicly released in 2015.  On 7 November 2018, 
          the GraphQL project was moved from Facebook to the 
          newly-established GraphQL foundation.`
        }
    ] 
    // Declare a new state variable, which we'll call "blogs"
    const [ blogs ] = useState(blogsData)
    const BlogContainer = props => (
        <div className="container">
            <div className="title animated fadeInDown" id="title">
                      Dummy Blogs
            </div>
            <br></br>
            <br></br>
            <ul className="blog-post columns-2">
                <li>
                {props.blogs.length > 0 ? (
                  props.blogs.slice(0, 1).map(blog => (
                  <div key={blog.id}>
                  <img alt="Card cap" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStgxK2JzFJudfryCCohkn-XbWLm4SVUhtsStg5GSeGk-RVC347eA" />
                  <h3>{blog.title}</h3>
                  <p>{blog.body}</p>
                  </div>
                  ))
                ): (
                  <div>
                    <h1>No blogs</h1>
                  </div>
                )}
                <div className="button">More</div>
                </li>
                <li>
                {props.blogs.length > 0 ? (
                  props.blogs.slice(1, 2).map(blog => (
                  <div key={blog.id}>
                  <img alt="Card cap" src="data:image/png;base64,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" />
                  <h3>{blog.title}</h3>
                  <p>{blog.body}</p>
                  </div>
                  ))
                ): (
                  <div>
                    <h1>No blogs</h1>
                  </div>
                )}
                <div className="button">More</div>
                </li>
                <li>
                {props.blogs.length > 0 ? (
                  props.blogs.slice(2, 3).map(blog => (
                  <div key={blog.id}>
                  <img height="160" alt="Card cap" src="data:image/png;base64,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" />
                  <h3>{blog.title}</h3>
                  <p>{blog.body}</p>
                  </div>
                  ))
                ): (
                  <div>
                    <h1>No blogs</h1>
                  </div>
                )}
                <div className="button">More</div>
                </li>
                <li>
                {props.blogs.length > 0 ? (
                  props.blogs.slice(3, 4).map(blog => (
                  <div key={blog.id}>
                  <img  alt="Card cap" src="data:image/png;base64,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" />
                  <h3>{blog.title}</h3>
                  <p>{blog.body}</p>
                  </div>
                  ))
                ): (
                  <div>
                    <h1>No blogs</h1>
                  </div>
                )}
                <div className="button">More</div>
                </li>
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