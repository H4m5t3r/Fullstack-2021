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

  return (
    <div>
      <Search filter={filter} handleFilterChange={handleFilterChange} />
      <Countries filteredList={filteredList} />
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

const Countries = ({ filteredList }) => {
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
        <Country key={country.name} country={country} />
      )}
    </li>
  )
}

const Country = ({ country }) => {
  return (
    <div>{country.name}</div>
  )
}

const DetailedCountry = ({ country }) => {
  return(
    <div>
      <h1>{country.name}</h1>
      <p>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
      </p>
      <h2>languages</h2>
      <ul>
        <Languages languages={country.languages} />
      </ul>
      <Flag flag={country.flag} />
    </div>

  )
}
const Languages = ({ languages }) => {
  return (
    <li>
      {languages.map(language => 
        <li>{language.name}</li>
      )}
    </li>
  )
}

const Flag = ({ flag }) => {
  return(
      <img src={flag} alt="The country's flag" height="100" max-width="200"></img>
  )
}

export default App;
