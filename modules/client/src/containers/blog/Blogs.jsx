// React
import React from 'react';
import { 
    connect 
} from 'react-redux';
// Local
import {  
    fetchBlogs 
} from '../../actions/blogs';
import Blog from './Blog.jsx';

/**
 * This is container class which will do all the heavy lifting,
 * will import this into our presentational component App.js
 */

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
    return (
        <div>
            {blogsData()}
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
export default connect(mapStateToProps, { fetchBlogs })(Blogs);