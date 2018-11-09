import React, { useState } from 'react'


function New() {
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
  const [blogs, setBlog] = useState(blogsData)

  // eslint-disable-next-line
  const createBlog = blog => {
    blog.id = blogs.length + 1
    setBlog([ ...blogs, blog ])
  }

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
          <div>
            <h2>View blogs</h2>
            <BlogTable blogs={blogs}/>
          </div>
        </div>
    )
}

export default New;
