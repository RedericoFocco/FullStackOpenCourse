import { useState, useEffect } from 'react'
import personsService from './services/persons'

const messageShownSec=3000 

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

const Notification = ({message,deletionFlag}) => {

  const notificationStyle = {
    color:deletionFlag ? 'red' : 'green' ,
    fontStyle: 'italic'
  }

  console.log('notificationStyle',notificationStyle)

  if (message === null) {
    return null
  }


  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notifyMessage, setNotificationMessage] = useState('')
  const [deletionFlag, setDeletionFlag] = useState(false)


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
    if(window.confirm(`Are you really sure you want to eliminate ${personToBeEliminated.name}`))
    {
      console.log("Confirmed")
      personsService.deleteRecord(id)
      .then(()=>{
        setPersons(changedArr)
      })
      .catch(()=>{
        console.log('fail')
        setDeletionFlag(true)
        setNotificationMessage(`Person ${personToBeEliminated.name} is already eliminated!`)
        setTimeout(()=>{setNotificationMessage(null)},messageShownSec)
        setPersons(changedArr)
      })
    }
    else
    {
      console.log("Rejected")
    }
  }

  const handlePersons = (eventClick) => 
  {
    eventClick.preventDefault()
    console.log('click event',eventClick)
    const newPerson = {
      name:newName,
      number:newNumber
    }
    console.log(`persons includes ${newName} and ${newNumber}?`,persons.some((p)=>p.name === newName)&&persons.some((p)=>p.number === newNumber))
    if ((persons.some((p)=>p.name === newName))&&(persons.some((p)=>p.number === newNumber)))
    {
      console.log('alerting user')
      alert(`${newName} with number ${newNumber} already exists!`)
    }
    else if (persons.some((p)=>p.name === newName)&&!(persons.some((p)=>p.number === newNumber)))
    {
      console.log('same name, different number')
      const personWsameName = persons.find(p=>p.name===newName)
      if(window.confirm(`Do you want to modify ${personWsameName.name} number?`))
      {
        console.log("Confirmed new number")
        //const copyArr=persons.map(p=>p.id!==personWsameName.id?p:newPerson) keep this as a lesson. the Id is automatically
        // set by the lovely json library on the "server" side. otherwise we should set the id here. better to map with response data
        personsService.updateRecord(personWsameName.id,newPerson)
        .then((respData)=>{
          setPersons(persons.map(p=>p.id!==personWsameName.id?p:respData))
          setDeletionFlag(false)
          setNotificationMessage('Number modified')
          setTimeout(()=>{setNotificationMessage(null)},messageShownSec)
        })
      }
      else
      {
        console.log("Rejected new number")
      }
     
    }
    else if (!persons.some((p)=>p.name === newName)&&(persons.some((p)=>p.number === newNumber)))
    {
      console.log('same number, different name')
      const personWsameNumber = persons.find(p=>p.number===newNumber)
      if(window.confirm(`Do you want to modify owner of number ${personWsameNumber.number} ?`))
      {
        console.log("Confirmed new name")
        //const copyArr=persons.map(p=>p.id!==personWsameName.id?p:newPerson) keep this as a lesson. the Id is automatically
        // set by the lovely json library on the "server" side. otherwise we should set the id here. better to map with response data
        personsService.updateRecord(personWsameNumber.id,newPerson)
        .then((respData)=>{
          setPersons(persons.map(p=>p.id!==personWsameNumber.id?p:respData))
          setDeletionFlag(false)
          setNotificationMessage('Name modified')
          setTimeout(()=>{setNotificationMessage(null)},messageShownSec)
        })
      }
      else
      {
        console.log("Rejected new owner")
      }
    }
    else
    {
      personsService.insertNew(newPerson)
      .then(responseData => {
        console.log('promise fulfilled:',responseData)
        setPersons(persons.concat(responseData))
        setDeletionFlag(false)
        setNotificationMessage('New user added')
        setTimeout(()=>{setNotificationMessage(null)},messageShownSec)
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

  const mainTitleStyle = {
    color:'red'
  }

  return (
    <div>
      <h2 style={mainTitleStyle}>Phonebook</h2>
        <Filter searchName={searchName} onChangeFunc={handleSearchName} />
      <h2>Add new</h2>
        <PersonForm submit={handlePersons} name={newName} onNameChange={handleNewName} number={newNumber} onNumberChange={handleNewNumber} />
      <h2>Numbers</h2>
        <Notification message={notifyMessage} deletionFlag={deletionFlag} />
        <Persons persons={persons} searchName={searchName} deletion={handleDeletion} />
    </div>
  )
}

export default App