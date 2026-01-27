import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { displayNotificationVote } from '../reducers/notificationReducer'

const messageShownSec=3000 

const NewAnecdoteForm = () => {
    const dispatch=useDispatch()

    const newAnecdote = event => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    console.log('New Anecdote Added',anecdoteContent)
    dispatch(addNewAnecdote(anecdoteContent))
    dispatch(addNewAnecdote(anecdoteContent))
    dispatch(displayNotificationVote(anecdoteContent))
    setTimeout(() => {dispatch(displayNotificationVote(''))}, messageShownSec);
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