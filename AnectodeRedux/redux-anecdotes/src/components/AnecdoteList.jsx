import { useDispatch, useSelector } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const dispatch=useDispatch()
    const anecdotes = useSelector(({anecdotes,filter,notification})=>{
      console.log(`ANECDOTES:${anecdotes},FILTER:${filter},NOTIFICATION:${notification}`)
      return anecdotes.filter(a=>a.content.includes(filter))
    }
    )

    const vote = (id) => {
    console.log('vote', id)
    dispatch(newVote(id))
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