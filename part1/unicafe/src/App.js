import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  const { good, neutral, bad } = props.feedback
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all <Total feedback={props.feedback} /></p>
      <p>average <Average feedback={props.feedback} /></p>
      <p>positive <Positive positive={good} feedback={props.feedback} />%</p>
    </div>
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
    return(good / (good + neutral + bad) * 100)
  }
  return (0)
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