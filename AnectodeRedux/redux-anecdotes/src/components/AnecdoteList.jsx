import { useSelector,useDispatch } from 'react-redux'
import { addNewVote,addNewAnecdote } from '../reducers/anecdoteReducer'
import { displayNotificationVote } from '../reducers/notificationReducer'

const messageShownSec=3000 

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes,filter,notification})=>{
      console.log(`ANECDOTES:${anecdotes},FILTER:${filter},NOTIFICATION:${notification}`)
      return anecdotes.filter(a=>a.content.includes(filter))
    }
    )
    const dispatch = useDispatch()
    
    const vote = (id,content) => {
    console.log('vote', id)
    dispatch(addNewVote(id))
    dispatch(displayNotificationVote(content))
    setTimeout(() => {dispatch(displayNotificationVote(''))}, messageShownSec);
    }

    return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id,anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList