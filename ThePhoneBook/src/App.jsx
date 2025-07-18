import { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({searchName,onChangeFunc}) => {
  console.log('searchName',searchName)
  console.log('onChangeFunc',onChangeFunc)
  return (
  <>
    looking for: <input value={searchName} onChange={onChangeFunc}/>
  </>
  )
}

const PersonForm = ({submit,name,onNameChange,number,onNumberChange}) => {
  console.log('submit action', submit)
  return (
    <form onSubmit={submit}>
      <div>
        name: <input value={name} onChange={onNameChange}/>
      </div>
      <div>
        number: <input value={number} onChange={onNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons,searchName}) => persons.filter((p)=>p.name.toLowerCase().startsWith(searchName.toLowerCase())).map((p)=><p key={p.name}>{p.name} {p.number}</p>)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')


  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  /*const handlePersons = (eventClick) => 
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
  }*/

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
      axios
      .post('http://localhost:3001/persons',newPerson)
      .then(response => {
        console.log('promise fulfilled:',response.data)
        setPersons(persons.concat(response.data))
      })
      //setPersons(persons.concat(newPerson)) //concat method implicitly creates a copy ;) 
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
        <Filter searchName={searchName} onChangeFunc={handleSearchName} />
      <h2>Add new</h2>
        <PersonForm submit={handlePersons} name={newName} onNameChange={handleNewName} number={newNumber} onNumberChange={handleNewNumber} />
      <h2>Numbers</h2>
        <Persons persons={persons} searchName={searchName} />
    </div>
  )
}

export default App