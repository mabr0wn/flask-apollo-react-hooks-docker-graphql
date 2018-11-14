// React
import React from 'react';
import { 
    connect 
} from 'react-redux';
// Apollo
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
// Local
import {  
    loadBlogs 
} from '../../actions/blogs.js';
import '../../styles/blog.css';

/**
 * 
 */
const GET_USERS_BLOGS = gql`
  query {
  users {
    edges {
      node {
        id,
        username,
        email
        blog {
          id,
          title,
          text
        },
        role {
          id,
          name
        }
      }
    }
  }
}
`

const Blogs = () => { 
    return (
        <div className="container"> 
            <div className="title animated fadeInDown" id="title">
                      Dummy Blogs with GraphQL
            </div>
            <br></br>
            <br></br>
            <Query query={GET_USERS_BLOGS}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>
              if (error) return <div>THERE WAS AN ERROR</div>
              console.log(data)
              return (
              <ul className="blog-post columns-2">
                <li>
                    <h3>{data.users.edges[0].node.blog.title}</h3>
                    <p>{data.users.edges[0].node.blog.text}</p>
                    <p>{data.users.edges[0].node.username}</p>
                </li>
                <li>
                    <h3>{data.users.edges[1].node.blog.title}</h3>
                    <p>{data.users.edges[1].node.blog.text}</p>
                    <p>{data.users.edges[1].node.username}</p>
                </li>
                <li>
                    <h3>{data.users.edges[2].node.blog.title}</h3>
                    <p>{data.users.edges[2].node.blog.text}</p>
                    <p>{data.users.edges[2].node.username}</p>
                </li>
                <li>
                    <h3>{data.users.edges[3].node.blog.title}</h3>
                    <p>{data.users.edges[3].node.blog.text}</p>
                    <p>{data.users.edges[3].node.username}</p>
                </li>
              </ul>
              )
            }}
            </Query>
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