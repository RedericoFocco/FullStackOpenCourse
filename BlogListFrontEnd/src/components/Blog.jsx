import { useState } from 'react'

const Blog = ({ blog,viewButton }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const [visible, setVisible] = useState(false)
  
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
  
    const toggleVisibility = () => {
      setVisible(!visible)
    }
  
    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          {blog.title}
          <button onClick={toggleVisibility}>{viewButton}</button>
        </div>
        <div style={showWhenVisible}>
          Title:  {blog.title}<br />
          Url: {blog.url}<br />
          Likes: {blog.likes} <button>Likes</button><br />
          Author: {blog.user_id.name}<br />
          <button onClick={toggleVisibility}>Hide</button>
        </div>
      </div>
    )
}

export default Blog