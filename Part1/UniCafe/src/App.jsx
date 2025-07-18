import { useState } from "react"

const DisplayHeaders = (prop) => <h1>{prop.text}</h1>

const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text,value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = (prop) => {
  const totalVotes=prop.numberGood+prop.numberBad+prop.numberNeutral
  const totalPositives=(prop.numberGood/totalVotes)*100
  const averageVotes=((prop.numberGood-prop.numberBad)/totalVotes)*100
  console.log('Total Votes:',totalVotes)
  if (totalVotes>0)
  {
    return (
      <div>
        <StatisticLine text="Good" value ={prop.numberGood} />
        <StatisticLine text="Neutral" value ={prop.numberNeutral} />
        <StatisticLine text="Bad" value ={prop.numberBad} />
        <StatisticLine text="All" value ={totalVotes} />
        <StatisticLine text="Average" value ={averageVotes} />
        <StatisticLine text="Positive Feedbacks" value ={totalPositives} />
      </div>
    )
  }
  else
  {
    console.log('Entered the else statement properl')
    return (
    <div>    
      No Feedback Given!
    </div>
    )
  }

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
      <Statistics numberGood={good} numberNeutral={neutral} numberBad={bad}/>
    </>
  )
}

export default App