import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'


const NewAnecdoteForm = () => {
    const dispatch=useDispatch()

    const newAnecdote = event => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    console.log('New Anecdote Added',anecdoteContent)
    dispatch(addNewAnecdote(anecdoteContent))
    }

    return(
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
)
}

export default NewAnecdoteForm