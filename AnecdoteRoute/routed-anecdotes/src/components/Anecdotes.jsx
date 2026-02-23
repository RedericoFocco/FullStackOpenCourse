import {
  Link
} from 'react-router-dom'


const AnecdoteList = ({ anecdotesList,notification }) => {
    return (
  <div>
    <h1>Anecdotes</h1>
    <h2>{notification}</h2>
    <ul>
      {anecdotesList.map(anecdote => 
      <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      </li>)}
    </ul>
  </div>
)
}

export default AnecdoteList
