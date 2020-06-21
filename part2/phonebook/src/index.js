import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Person = ({name, number}) => <p>{name} {number}</p>
const ShowPersons = ({persons}) => {
  return (<>
    <h3>Numbers</h3>
    {persons.map(({name, number}) => <Person key={name} name={name} number={number} />)}
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

const Input = ({value, setter}) => <input value={value} onChange={(event) => setter(event.target.value)} />
const AddForm = ({submitHandler, newNameState, newNumState}) => {
return(
  <>
  <h3>Add Person</h3>
  <form onSubmit={submitHandler}>
    <div>
      name: <Input value={newNameState.value} setter={newNameState.updater} />
    </div>
    <div>
      number: <Input value={newNumState.value} setter={newNumState.updater} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  </>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.find(({name}) => name === newName) !== undefined){
      window.alert(`${newName} is already in the phonebook.`)
    }
    else{
      const newPersons = [...persons, {name: newName, number: newNum}]
      setPersons(newPersons)
      setNewName('')
      setNewNum('')
    }
  }

  const handleSearch = (event) => {
    setShowAll(event.target.value === '')
    setNewSearch(event.target.value)
  }
  const showPersons = showAll ? persons : persons.filter(({name}) => name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search input={newSearch} handler={handleSearch}/>
      <AddForm submitHandler={addPerson} newNameState={{value: newName, updater: setNewName}} newNumState={{value: newNum, updater: setNewNum}} />
      <ShowPersons persons={showPersons} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
