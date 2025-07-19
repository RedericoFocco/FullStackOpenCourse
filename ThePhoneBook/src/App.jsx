import { useState, useEffect } from 'react'
import personsService from './services/persons'

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

const Persons = ({persons,searchName,deletion}) => persons.filter((p)=>p.name.toLowerCase().startsWith(searchName.toLowerCase())).map((p)=>
{
  return (<p key={p.name}>{p.name} {p.number}
    <button onClick={()=>deletion(p.id)}>delete</button>
  </p>)
}
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')


  useEffect(() => {
    console.log('effect')
    personsService.getAll()
      .then(responseData => {
        console.log('promise fulfilled:',responseData)
        setPersons(responseData)
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


  const handleDeletion = (id) => 
  {
    console.log('passed id',id)
    const personToBeEliminated = persons.find(p=>p.id===id)
    console.log('personToBeEliminated',personToBeEliminated)
    const changedArr=persons.filter(p=>p.id!==personToBeEliminated.id)
    console.log('changedArr',changedArr)
    personsService.deleteRecord(id)
    .then(()=>{
      setPersons(changedArr)
    })
  }

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
      personsService.insertNew(newPerson)
      .then(responseData => {
        console.log('promise fulfilled:',responseData)
        setPersons(persons.concat(responseData))
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
        <Persons persons={persons} searchName={searchName} deletion={handleDeletion} />
    </div>
  )
}

export default App