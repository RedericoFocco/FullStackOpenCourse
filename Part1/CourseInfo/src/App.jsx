import { useState } from "react"

const DisplayFeedback = (prop) => <h1>{prop.text}</h1>

const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <DisplayFeedback text='Give Feedback'/>
      <Button onClick={()=>console.log('clicked good')} text='Good'/>
      <Button onClick={()=>console.log('clicked neutral')} text='Neutral'/>
      <Button onClick={()=>console.log('clicked bad')} text='Bad'/>
    </>
  )
}

export default App