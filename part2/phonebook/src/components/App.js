import React, { useState, useEffect } from 'react'

import AddForm from './AddForm'
import phonebook_api from '../services/server_api'

const Person = ({name, number, deleteFunc}) => {
  return(
    <>
    <p>{name} {number}</p>
    <button onClick={() => deleteFunc(name)}>delete</button>
    </>
  )
}
const ShowPersons = ({persons, deleteFunc}) => {
  return (<>
    <h3>Numbers</h3>
    {persons.map(({name, number}) => <Person key={name} name={name} number={number} deleteFunc={deleteFunc}/>)}
    </>)
}

const Search = ({input, handler}) => {
  return(
    <>
    <strong>Search: </strong>
    <input value={input} onChange={handler} />
    </>
  )
}

const Notification = ({message, error}) => {
  if(message === null)
    return null
  else {
    const successStyle = {
      backgroundColor: '#86868F',
      border: 'solid #31C423',
      borderRadius: 30,
      fontStyle: 'italic',
      fontSize: '20px',
      padding: '10px',
      marginBottom: '10px'
    }

    const errorStyle = {
      backgroundColor: '#86868F',
      border: 'solid #F20505',
      borderRadius: 30,
      fontStyle: 'italic',
      fontSize: '20px',
      padding: '10px',
      marginBottom: '10px'
    }

    const notifStyle = error? errorStyle : successStyle
    return (
      <div style={notifStyle}>
      {message}
      </div>
    )
  }
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notif, setNotif] = useState(null)
  const [error, setError] = useState(false)

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      id: newName,
      name: newName,
      number: newNum
    }
    if(persons.find(({name}) => name === newName) !== undefined){
      const result = window.confirm(`${newName} is already in the phonebook. Replace old number with a new one?`)
      if(result) {
        phonebook_api
        .updatePerson(newName, newPerson)
          .then(updated => {
            if(updated === null) {
              setError(true)
              setNotif(`Error: ${newName} has already been removed from the phonebook`)
              setTimeout(() => {
                setNotif(null)
                setError(false)
              }, 3000)

            }
            else {
              setPersons(persons.map(person => person.id === newName? updated : person))
              setNotif(`${newName} was successfully updated in phonebook`)
              setNewName('')
              setNewNum('')
              setTimeout(() => {
                setNotif(null)
              }, 3000)
            }
          })
      }
    }
    else{
      phonebook_api
      .addToServer(newPerson)
        .then(data => {
          setPersons([...persons, data])
          setNotif(`${newName} was successfully added to phonebook`)
          setNewName('')
          setNewNum('')
          setTimeout(() => {
            setNotif(null)
          }, 3000)
          })

    }
  }


  const handleDelete = (id) => {
      const result = window.confirm(`Are you sure you want to delete ${id} from the phonebook?`)
      if(result) {
        phonebook_api
        .deletePerson(id)
          .then(data => {
                setPersons(data)
                })
      }
  }


  const handleSearch = (event) => {
    setShowAll(event.target.value === '')
    setNewSearch(event.target.value)
  }
  const showPersons = showAll ? persons : persons.filter(({name}) => name.toLowerCase().includes(newSearch.toLowerCase()))

  useEffect(() => {
    phonebook_api
    .fetchAll()
    .then((data) => {
      setPersons(data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notif} error={error} />
      <Search input={newSearch} handler={handleSearch}/>
      <AddForm submitHandler={addPerson} newNameState={{value: newName, updater: setNewName}} newNumState={{value: newNum, updater: setNewNum}} />
      <ShowPersons persons={showPersons} deleteFunc={handleDelete}/>
    </div>
  )
}

export default App
