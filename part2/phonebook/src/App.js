import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

import Search from './components/Search'
import AddForm from './components/AddForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import contactService from './services/contactService'




const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ search, setSearch] = useState('')
  const [ notif, setNotif ] = useState('')
  const [ error, setError ] = useState(false)

  const handleNewName = (event) => {
      setNewName(event.target.value)
  }

  const handleNewNum = (event) => {
      setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
      setSearch(event.target.value)
  }

  const handleDelete = (id) => {
      const delPerson = persons.find(person => person["id"] === id)
      const result = window.confirm(`Are you sure you want to delete ${delPerson["name"]} from the phonebook?`)
      if(result) {
          contactService
            .deletePerson(id)
            .then(response => {
                setPersons(persons.filter(person => person.id !== id))
            })
      }
  }

  const handleSubmit = (event) => {
      event.preventDefault()
      if(persons.find(({name}) => name === newName)) {
          const result = window.confirm(`${newName} is already in the phonebook. Replace the old number with the new one?`)
          if(result) {
              const oldPerson = persons.find(({name}) => name === newName)
              const updated = {...oldPerson, number: newNumber}
              contactService
                .updateNumber(updated["id"], updated)
                .then(newPerson => {
                    setPersons(persons.map(person => person["id"] !== updated["id"] ? person : newPerson))
                    setNotif(`${newPerson["name"]}'s number has been updated.`)
                    setTimeout(() => {
                        setNotif('')
                    }, 3000)
                })
                .catch(error => {
                    setError(true)
                    setNotif(`Error: ${updated["name"]}'s information has been deleted from server.'`)
                    setTimeout(() => {
                        setNotif('')
                        setError(false)
                    }, 3000)
                })
          }
      }
      else {
          //I decided to generate IDs on the browser side
          //to handle the edge case of trying to delete
          //the last added contact. The ID for its object would not be on the
          //browser since it has just been generated on the server
          contactService
            .addPerson({
                name: newName,
                number: newNumber,
                id: nanoid()
            })
            .then(newPerson => {
                setPersons(persons.concat(newPerson))
                setNotif(`${newPerson["name"]} has been added to the phonebook.`)
                setTimeout(() => {
                    setNotif('')
                }, 3000)

            })
      }
      setNewName('')
      setNewNumber('')
  }

  const showPersons = search === ''
    ? persons
    : persons.filter(({name}) => name.toLowerCase().includes(search.toLowerCase()))

    useEffect(() => {
        contactService
            .getAll()
            .then(personsList => {
                console.log('connected to server')
                setPersons(personsList)
            })
    }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notif} error={error} />
      <h2>Search</h2>
        <Search inputVal={search} handler={handleSearch} />
      <h2>Add New</h2>
        <AddForm name={{
            value: newName,
            handler: handleNewName
        }} number={{
            value: newNumber,
            handler: handleNewNum
        }} submitHandler={handleSubmit} />
      <h2>Numbers</h2>
        <Persons show={showPersons} delHandler={handleDelete}/>
    </div>
  )
}

export default App
