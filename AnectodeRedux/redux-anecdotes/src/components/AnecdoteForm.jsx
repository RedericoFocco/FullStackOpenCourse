import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { displayNotificationVote } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotesService'

const messageShownSec=3000 

const NewAnecdoteForm = () => {
    const dispatch=useDispatch() 

    const newAnecdote = async(event) => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    console.log('New Anecdote Added',anecdoteContent)
    const anecdoteAdded = await anecdotesService.createNewAnecdote(anecdoteContent) 
    console.log('anecdoteAdded',anecdoteAdded)
    dispatch(addNewAnecdote(anecdoteAdded))
    dispatch(displayNotificationVote(anecdoteAdded.content))
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