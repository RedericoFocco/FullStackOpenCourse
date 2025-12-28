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
          {blog.title}<br />
          {blog.url}<br />
          {blog.author}<br />
          <button onClick={toggleVisibility}>Hide</button>
        </div>
      </div>
    )
}

export default Blog