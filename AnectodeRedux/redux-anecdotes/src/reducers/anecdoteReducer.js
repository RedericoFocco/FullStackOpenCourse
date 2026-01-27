import { createSlice,current } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
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
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const {addNewVote,addNewAnecdote,setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer
