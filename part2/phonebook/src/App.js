import React, { useState } from 'react'
import Search from './components/Search'
import AddForm from './components/AddForm'
import Persons from './components/Persons'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ search, setSearch] = useState('')

  const handleNewName = (event) => {
      setNewName(event.target.value)
  }

  const handleNewNum = (event) => {
      setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
      setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
      event.preventDefault()
      if(persons.find(({name}) => name === newName)) {
          window.alert(`${newName} is already in the phonebook.`)
      }
      else {
          setPersons(persons.concat({
              name: newName,
              number: newNumber
          }))
      }
      setNewName('')
      setNewNumber('')
  }

  const showPersons = search === ''
    ? persons
    : persons.filter(({name}) => name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
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
        <Persons show={showPersons} />
    </div>
  )
}

export default App
