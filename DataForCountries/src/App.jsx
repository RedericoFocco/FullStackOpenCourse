import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const messageShownSec=3000 

const Filter = ({searchName,onChangeFunc}) => {
  console.log('searchName',searchName)
  console.log('onChangeFunc',onChangeFunc)
  return (
  <>
    find countries: <input value={searchName} onChange={onChangeFunc}/>
  </>
  )
}

const CountriesForm = ({submit,name,onNameChange,number,onNumberChange}) => {
  console.log('submit action', submit)
  return (
    <form onSubmit={submit}>
      <div>
        name: <input value={name} onChange={onNameChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Countries = ({ countries, searchName }) => {
  const countriesFiltered = countries.filter((p) => p.name.common.toLowerCase().startsWith(searchName.toLowerCase()))

  console.log('countriesFiltered.length', countriesFiltered.length)

  if (countriesFiltered.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  }
  else if (countriesFiltered.length>1 && countriesFiltered.length<=10)
  {
    console.log('countries filtered < 10', countriesFiltered)
    return (countriesFiltered.map(p => {
      return (<p key={p.name.common}>{p.name.common}
        {/*<button onClick={()=>deletion(p.id)}>delete</button>*/}
      </p>)
      }
      )
    )
  }
  else if (countriesFiltered.length===1)
  {
    console.log('countries filtered = 1', countriesFiltered)
    return (<p>{countriesFiltered[0].name.common}</p>) //not so proud of this
  }
  else
  {
    return(<p></p>)
  }

}

/*const Notification = ({message,deletionFlag}) => {

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
}*/

const App = () => {
  const [countries, setCountries] = useState([])
  /*const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')*/
  const [searchName, setSearchName] = useState('')
  /*const [notifyMessage, setNotificationMessage] = useState('')
  const [deletionFlag, setDeletionFlag] = useState(false)*/


  useEffect(() => {
    console.log('effect')
    countriesService.getAll()
      .then(responseData => {
        console.log('promise fulfilled:',responseData)
        setCountries(responseData)
      })
  }, [])
  console.log('render', countries.length, 'countries')

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


  /*const handleDeletion = (id) => 
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
  }*/

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
        <Filter searchName={searchName} onChangeFunc={handleSearchName} />
      <h2>Countries</h2>
        <Countries countries={countries} searchName={searchName} />
    </div>
  )
}

export default App