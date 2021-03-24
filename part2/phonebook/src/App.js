import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')
  const list = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    if (!(persons.some(person => person.name === newName))) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const deletePerson = (event) => {
    event.preventDefault()
    personService
      .delete(event.target.value)
      .then(() => {
        setPersons(persons.filter(({id}) => parseInt(id) !== parseInt(event.target.value)))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      </form>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons list={list} deletePerson={deletePerson} />
    </div>
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number} <button value={person.id} onClick={deletePerson}>delete</button>
      </div>
  )
}

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input
      value={filter}
      onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange} />
        </div>
        <div>number: <input 
          value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({ list, deletePerson }) => {
  return (
    <li>
      {list.map(person => 
        <Person key={person.name} person={person} deletePerson={deletePerson} />
      )}
    </li>
  )
}

export default App