import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')
  const list = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  const [successNotification, setSuccessNotification] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)

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
          setSuccessNotification(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessNotification(null)
          }, 5000)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = {
          id: persons.filter(person => person.name === newName)[0].id,
          name: newName,
          number: newNumber
        }
        personService
          .update(personObject.id, personObject)
          .then(returnedPerson => {
            setSuccessNotification(`Updated ${returnedPerson.name}`)
            setTimeout(() => {
              setSuccessNotification(null)
            }, 5000)
            setPersons(persons.map(person => person.id !== personObject.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  const deletePerson = (event) => {
    event.preventDefault()
    if (window.confirm(`Delete ${persons.filter(({ id }) => id === event.target.value)[0].name}?`))
    personService
      .delete(event.target.value)
      .then(() => {
        setPersons(persons.filter(({id}) => id !== event.target.value))
      })
      .catch(error => {
        setErrorNotification(
          `Information of 
          ${persons.filter(({ id }) => id === event.target.value)[0].name} 
          has already been removed from the server`
        )
        setTimeout(() => {
          setErrorNotification(null)
        }, 5000)
        setPersons(persons.filter(({id}) => id !== event.target.value))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successNotification} />
      <ErrorNotification message={errorNotification} />
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

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="successful">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App