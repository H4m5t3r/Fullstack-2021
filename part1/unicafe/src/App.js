import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  const { good, neutral, bad } = props.feedback
  if (good + neutral + bad === 0) {
    return (
      <div>No feedback given</div>
    )
  } else {
    return (
      <div>
        <Statistic text="good" value ={good} />
        <Statistic text="neutral" value ={neutral} />
        <Statistic text="bad" value ={bad} />
        <Statistic text="all" value ={<Total feedback={props.feedback} />} />
        <Statistic text="average" value ={<Average feedback={props.feedback} />} />
        <Statistic text="positive" value ={<Positive feedback={props.feedback} />} />
      </div>
    )
  }
}

const Statistic = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const Total = (props) => {
  const { good, neutral, bad } = props.feedback
  return (good + neutral + bad)
}

const Average = (props) => {
  const { good, neutral, bad } = props.feedback
  if (good + neutral + bad > 0) {
    return ((good * 1 + bad * -1) / (good + bad + neutral))
  } else {
    return 0
  }
}

const Positive = (props) => {
  const { good, neutral, bad } = props.feedback
  if (good + neutral + bad > 0) {
    return(`${good / (good + neutral + bad) * 100}%`)
  } else {
    return (`${0}%`)
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  const feedback = {
    good: good,
    neutral: neutral,
    bad: bad
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <h1>statistics</h1>
      <Statistics feedback={feedback} />
    </div>
  )
}

export default App