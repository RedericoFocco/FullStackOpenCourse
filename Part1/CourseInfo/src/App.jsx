import { useState } from "react"

const DisplayHeaders = (prop) => <h1>{prop.text}</h1>

const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>

const DisplayVotes = (prop) => {
  return (
    <div>
      <p>good {prop.numberGood}</p>
      <p>neutral {prop.numberNeutral}</p>
      <p>bad {prop.numberBad}</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const IncreaseGood = () => {setGood(good+1)}
  const IncreaseNeutral = () => {setNeutral(neutral+1)}
  const IncreaseBad = () => {setBad(bad+1)}

  return (
    <>
      <DisplayHeaders text='Give Feedback'/>
      <Button onClick={IncreaseGood} text='Good'/>
      <Button onClick={IncreaseNeutral} text='Neutral'/>
      <Button onClick={IncreaseBad} text='Bad'/>
      <DisplayHeaders text='Statistics'/>
      <DisplayVotes numberGood={good} numberNeutral={neutral} numberBad={bad}/>
    </>
  )
}

export default App