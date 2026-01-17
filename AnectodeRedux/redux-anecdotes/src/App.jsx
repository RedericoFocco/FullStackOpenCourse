import { useSelector,useDispatch } from 'react-redux'
import { addNewVote,addNewAnectode } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = id => {
    console.log('vote', id)
    dispatch(addNewVote(id))
  }

  const newAnectode = event => {
    event.preventDefault()
    const anecdoteContent = event.target.anectode.value
    console.log('New Anectode Added',anecdoteContent)
    dispatch(addNewAnectode(anecdoteContent))

  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={newAnectode}>
        <div>
          <input name="anectode" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
