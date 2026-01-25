import { useSelector,useDispatch } from 'react-redux'
import { addNewVote,addNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes,filter})=>{
      console.log(`ANECDOTES:${anecdotes},FILTER:${filter}`)
      return anecdotes.filter(a=>a.content.includes(filter))
    }
    )
    const dispatch = useDispatch()
    
    const vote = id => {
    console.log('vote', id)
    dispatch(addNewVote(id))
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
    </div>
  )
}

export default AnecdoteList