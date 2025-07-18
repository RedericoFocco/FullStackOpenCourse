import { useState } from 'react'


const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>

const MostVotes = (p) => <h1>{p.text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const voted = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)
  
  const [vote, setVote] = useState([...voted])

  console.log(voted[selected])

  Array.prototype.maxIndex = function() {
  return this.indexOf(Math.max.apply(null, this));
  };

  const generateAnecdote = () => {setSelected(Math.floor(Math.random()*anecdotes.length))}

  const incrementVotesArr = () => {
    vote[selected]+=1
    const votes = [...vote]
    console.log('votes', votes)
    console.log('selected',selected)
    console.log('votes[selected]',votes[selected])
    setVote(votes)
  }

  console.log(anecdotes.length)

  return (
    <div>
      {anecdotes[selected]}
      <p></p>
      <p>has {vote[selected]} votes</p>
      <Button onClick={incrementVotesArr} text={'vote'} />
      <Button onClick={generateAnecdote} text={'next anecdote'} />
      <MostVotes text={'Anecdote with most votes'}/>
      <p>{anecdotes[vote.maxIndex()]} has {vote[vote.maxIndex()]} votes</p>
    </div>
  )
}

export default App