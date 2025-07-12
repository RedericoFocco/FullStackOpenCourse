import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number: '040-1234567'},
     { name: 'Feder',number: '042-1234567'},
      { name: 'Marck',number: '044-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const handlePersons = (eventClick) => 
  {
    eventClick.preventDefault()
    console.log('click event',eventClick)
    const newPerson = {
      name:newName,
      number:newNumber
    }
    console.log(`persons includes ${newName} or ${newNumber}?`,persons.some((p)=>p.name === newName)||persons.some((p)=>p.number === newNumber))
    if (persons.some((p)=>p.name === newName)||persons.some((p)=>p.number === newNumber))
    {
      console.log('alerting user')
      alert(`${newName} or ${newNumber} already exists!`)
    }
    else
    {
      setPersons(persons.concat(newPerson)) //concat method implicitly creates a copy ;) 
      console.log('persons:',persons)
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value) //what user is actually typing
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value) //what user is actually typing
  }

  const handleSearchName = (event) => {
    console.log(event.target.value)
    setSearchName(event.target.value) //what user is actually typing
  }

  return (
    <div>
      <h2>Phonebook</h2>
        looking for: <input value={searchName} onChange={handleSearchName}/>
      <h2>Add new</h2>
      <form onSubmit={handlePersons}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter((p)=>p.name.toLowerCase().startsWith(searchName.toLowerCase())).map((p)=><p key={p.name}>{p.name} {p.number}</p>)}
    </div>
  )
}

export default App