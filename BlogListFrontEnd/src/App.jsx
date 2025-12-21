import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const msgDelaySec = 5000 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [loginMsg, setLoginMsg] = useState('')
  const [wrongLoginMsg, setWrongLoginMsg] = useState('')
  const [newBlogMsg, setNewBlogMsg] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('') 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    const loggedUserJson = JSON.parse(loggedUser)
    if (loggedUserJson)
    {
      setUser(loggedUserJson)
    }
  }, [])

  const logoutForm = () => (
    <>
      <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
      </form>
      </>
  ) 

  const loginForm = () => {
      return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
      <p>{wrongLoginMsg}</p>
      </>
      )
  }

  const createBlog = () => {
      return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <label>
            title:
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            author:
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            url:
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <p>{newBlogMsg}</p>
        <button type="submit">create</button>
      </form>
      </>
      )
  }


  const blogList = () => (
    <>
      <h2>blogs</h2>
      <p>{loginMsg}</p>
      <p>Your blogs:</p>
      {blogs.filter((blog)=>blog.user_id.username === user.username).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  ) 
  
  const handleNewBlog = async eventClick => {
    eventClick.preventDefault()
    const postObj = {title_:title,author_:author,url_:url,token_:user.token,userId_:user.userId}
    try
    {
      const response = await blogService.postNewBlog(postObj)
      console.log('response',response)
      setNewBlogMsg(`new blog named ${response.title} added!`)
      setTimeout(()=>{setNewBlogMsg(null)},msgDelaySec)
    }
    catch
    {
      console.log('new blog service error!')
    }
  }

  const handleLogout = async eventClick => {
    eventClick.preventDefault()
    setUser(null)
    setWrongLoginMsg('')
    window.localStorage.clear()
  }

  const handleLogin = async eventClick => {
    eventClick.preventDefault()
    //console.log('logging in with', username, password)
    try
    {
      const user = await loginService.loginPost({username,password})
      window.localStorage.setItem('user',JSON.stringify(user))
      //console.log("logging output:",loggingOutput)
      if(user)
      {
        setLoginMsg(`${user.username} logged in`)
        setTimeout(()=>{setLoginMsg(null)},msgDelaySec)
        console.log('logged!',user)
        setUser(user)
      }
      else
      {
        setWrongLoginMsg('Error logging in')
        console.log('mì')
      }
    }
    catch
    {
      setWrongLoginMsg('Error logging in! Please check username and pwd')
      console.log('catching login')
    }
  }

  return (
    <div>
      {user && blogList()}
      {user && createBlog()}
      {user && logoutForm()}
      {!user && loginForm()}  
    </div>
  )
}

export default App