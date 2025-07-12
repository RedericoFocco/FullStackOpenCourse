import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handlePersons = (eventClick) => 
  {
    eventClick.preventDefault()
    console.log('click event',eventClick)
    const newPerson = {
      name:newName
    }
    setPersons(persons.concat(newPerson)) //concat method implicitly creates a copy ;) 
    console.log('persons:',persons)
    setNewName('')
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value) //what user is actually typing
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handlePersons}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((p)=><p key={p.name}>{p.name}</p>)}
    </div>
  )
}

export default App