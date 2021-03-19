import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }
  
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      <li>
        {persons.map(person => 
          <Person key={person.name} person={person} />
        )}
      </li>
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <div>{person.name}</div>
  )
}

export default App