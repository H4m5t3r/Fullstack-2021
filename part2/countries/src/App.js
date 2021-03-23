import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [ filter, setNewFilter ] = useState('')
  const [ countries, setCountries] = useState([])
  const filteredList = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleShowCountry = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Search filter={filter} handleFilterChange={handleFilterChange} />
      <Countries filteredList={filteredList} handleShowCountry={handleShowCountry} />
    </div>
  );
}

const Search = ({ filter, handleFilterChange }) => {
  return(
    <div>
      find countries <input
      value={filter}
      onChange={handleFilterChange} />
    </div>
  )
}

const Countries = ({ filteredList, handleShowCountry }) => {
  if (filteredList.length > 10) {
    return(
      <div>Too many matches, specify another filter</div>
    )
  } else if (filteredList.length === 1) {
    return(
      <DetailedCountry country={filteredList[0]} />
    )
  }
  return (
    <li>
      {filteredList.map(country => 
        <Country key={country.name} country={country} handleShowCountry={handleShowCountry} />
      )}
    </li>
  )
}

const Country = ({ country, handleShowCountry }) => {
  return (
    <div>
      {country.name} <button value={country.name} onClick={handleShowCountry}>show</button>
    </div>
  )
}

const DetailedCountry = ({ country }) => {
  return(
    <div>
      <h1>{country.name}</h1>
      <p>
        <li>capital {country.capital}</li>
        <li>population {country.population}</li>
      </p>
      <h2>languages</h2>
      <ul>
        <div>
          {country.languages.map(language => 
            <Language key={language.name} name={language.name} />
          )}
        </div>
      </ul>
      <Flag flag={country.flag} />
    </div>

  )
}
const Language = ({ name }) => {
  return (
    <li>{name}</li>
  )
}

const Flag = ({ flag }) => {
  return(
      <img src={flag} alt="The country's flag" height="100" max-width="200"></img>
  )
}

export default App;
