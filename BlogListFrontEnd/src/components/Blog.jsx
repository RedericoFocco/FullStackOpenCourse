import { useState } from 'react'

const Blog = ({ blog,viewButton,handleLikes,handleDeletion }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    background: '#ef4444',
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '500'
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
          <button onClick={toggleVisibility}>Hide</button><br />
          Title:  {blog.title}<br />
          Url: {blog.url}<br />
          Likes: {blog.likes} <button onClick={() => handleLikes(blog)}>Likes</button><br />
          Author: {blog.user_id.name}<br />
          <button style={buttonStyle} onClick={() => handleDeletion(blog)}>Delete</button>
        </div>
      </div>
    )
}

export default Blog