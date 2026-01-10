import { useState } from 'react'

const CreateBlog = ( { handleNewBlog_,newBlogMsg_} ) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleNewBlog_({
      title,
      author,
      url
    })
    // Reset form
    setTitle('')
    setAuthor('')
    setUrl('')
  }

      return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            author:
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            url:
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
        </div>
        <p>{newBlogMsg_}</p>
        <button type="submit">create</button>
      </form>
      </>
      )
  }

  export default CreateBlog