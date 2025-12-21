import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [loginMsg, setLoginMsg] = useState('')
  const [wrongLoginMsg, setWrongLoginMsg] = useState('') 
  const [user, setUser] = useState(null) 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
  
  const handleLogout = async eventClick => {
    eventClick.preventDefault()
    setUser(null)
    setWrongLoginMsg('')
  }

  const handleLogin = async eventClick => {
    eventClick.preventDefault()
    //console.log('logging in with', username, password)
    try
    {
      const user = await loginService.loginPost({username,password})
      //console.log("logging output:",loggingOutput)
      if(user)
      {
        setLoginMsg(`${user.username} logged in`)
        setTimeout(()=>{setLoginMsg(null)},2000)
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
      {user && logoutForm()}
      {!user && loginForm()}  
    </div>
  )
}

export default App