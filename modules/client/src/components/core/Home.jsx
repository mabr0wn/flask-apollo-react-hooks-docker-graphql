import React from 'react'
import Blogs from '../../containers/blog/Blogs.jsx';

function Home() {
  return (
    <div className="container"> 
      <div className="title" id="title">
                Fixture Blogs with GraphQL
      </div>
      <Blogs></Blogs>
    </div>
  )
}

export default Home;