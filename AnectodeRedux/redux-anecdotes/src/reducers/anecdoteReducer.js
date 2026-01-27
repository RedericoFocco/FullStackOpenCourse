import { createSlice,current } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

/*export const addNewVote = id => {
  return  {
    type : 'ADD_VOTE',
    payload : { id }
  }
}

export const addNewAnecdote = content => {
  return  {
    type : 'ADD_NEW_ANECDOTE',
    payload : { 
      content,
      id: getId(),
      votes:0
     }
  }
}*/

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers:{
    addNewVote(state,action){
        console.log("state addNewVote",current(state))
        const actionId=action.payload
        const votedAnecdote = state.find(a=>a.id===actionId)
        console.log("voted anecdote",current(votedAnecdote))
        const newAnecdote = {
          ...votedAnecdote,
          votes:votedAnecdote.votes+1
        }
        return state.map(a=>a.id !== actionId ? a : newAnecdote).sort((a,b)=>b.votes-a.votes)
    },
    addNewAnecdote(state,action){
      console.log("new anecdote action",action.payload)  
      console.log("new anecdote state",current(state))
      const newAnecdote = {
          content:action.payload,
          id: getId(),
          votes:0
      }
      return [...state,newAnecdote] 
    }
  }
})

/*const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type)
  {
    case 'ADD_VOTE':
      {
        const votedAnecdote = state.find(a=>a.id===action.payload.id)
        const newAnecdote = {
          ...votedAnecdote,
          votes:votedAnecdote.votes+1
        }
        return state.map(a=>a.id !== action.payload.id ? a : newAnecdote).sort((a,b)=>b.votes-a.votes)
    }
    case 'ADD_NEW_ANECDOTE':
      {
        return [...state,action.payload] 
      }
    default :
      return state
  }
}*/

export const {addNewVote,addNewAnecdote} = anecdoteSlice.actions
export default anecdoteSlice.reducer
