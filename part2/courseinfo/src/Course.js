import React from 'react'

const Course = ({courses}) => {
    return (
      courses.map(course => {
        return (
          <li key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </li>
        )
      })
    )
  }
  
  const Header = ({ name }) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      parts.map(parts => {
        return (
          <Part key = {parts.id} name={parts.name} exercises={parts.exercises} />
        )
      })
    )
  }
  
  const Part = ({name, exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
  }
  
  const Total = ({ parts }) => {
    return (
      <b>
        total of <CalculateTotal parts={parts} /> exercises
      </b>
    )
  }
  
  const CalculateTotal = ({ parts }) => {
    return(
      parts.reduce((sum, part) => {
        return sum + part.exercises
      }, 0)
    )
  }

  export default Course