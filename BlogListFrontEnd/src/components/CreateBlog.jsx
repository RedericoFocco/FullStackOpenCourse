const CreateBlog = ({handleNewBlog_,title_,handleTitleChange_,
    author_,handleAuthorChange_,
    url_,handleUrlChange_,
    newBlogMsg_
}) => {
      return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleNewBlog_}>
        <div>
          <label>
            title:
            <input
              type="text"
              value={title_}
              onChange={handleTitleChange_}
            />
          </label>
        </div>

        <div>
          <label>
            author:
            <input
              type="text"
              value={author_}
              onChange={handleAuthorChange_}
            />
          </label>
        </div>

        <div>
          <label>
            url:
            <input
              type="text"
              value={url_}
              onChange={handleUrlChange_}
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