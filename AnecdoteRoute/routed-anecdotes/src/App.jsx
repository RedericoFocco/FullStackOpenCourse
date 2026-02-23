import { useState } from 'react'
import About from './components/About'
import AnecdoteList from './components/Anecdotes'
import CreateNew from './components/NewAnecdote'
import AnecdoteDetail from './components/AnecdoteDetail'
import {
  BrowserRouter as Router,
  Routes, Route, Link,Navigate,
  useMatch
} from 'react-router-dom'


const Menu = ({anecdotes,addNewAnecdote,notification}) => {
  console.log("notification",notification)
  const padding = {
    paddingRight: 5
  }
  console.log("addNewAnecdote",addNewAnecdote)
  console.log("addNewAnecdote",typeof(addNewAnecdote))
  const match = useMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null

  return (
    <div>
      <div>
        <Link style={padding} to="/anecdotes">anecdotes</Link>
        <Link style={padding} to="/createNew">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
      
        <Routes>
          <Route path="/about" element={<About />}/>
          <Route path="/createNew" element={notification==='' ? <CreateNew addNew={addNewAnecdote} />:<Navigate replace to="/anecdotes"/>}/>
          <Route path="/anecdotes" element={<AnecdoteList anecdotesList={anecdotes} notification={notification}/>}/>
          <Route path="/anecdotes/:id" element={<AnecdoteDetail singleAnecdote={anecdote} />}/>
        </Routes>
      </div>
  )
}

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)



const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`${anecdote.content} created`)
    setTimeout(()=>setNotification(''),3000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

   const padding = {
    padding: 5
  }

  return (
      <div>
        <h1>Software anecdotes</h1>
        <Menu anecdotes={anecdotes} addNewAnecdote={addNew} notification={notification} />
        <Footer />
      </div>
  )
}

export default App
