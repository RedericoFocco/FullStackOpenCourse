const AnecdoteList = ({ anecdotesList }) => {
    return (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotesList.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
    </ul>
  </div>
)
}

export default AnecdoteList
