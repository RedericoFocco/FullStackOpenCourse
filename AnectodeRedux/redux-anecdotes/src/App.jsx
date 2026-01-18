import NewAnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <Filter />
      <AnecdoteList />
      <NewAnecdoteForm />
    </div>
  )
}

export default App
