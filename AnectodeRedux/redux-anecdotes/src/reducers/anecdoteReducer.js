import { createSlice,current } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotesService'
import { displayNotificationVote } from '../reducers/notificationReducer'

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
      /*console.log("new anecdote state",current(state))
      const newAnecdote = {
          content:action.payload,
          id: getId(),
          votes:0
      }
      return [...state,newAnecdote] */
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const {addNewVote,addNewAnecdote,setAnecdotes} = anecdoteSlice.actions

export const newVote = (id) => {
  return async (dispatch) => {
    console.log('in newVote')
    const votedAnecdote = await anecdotesService.updateVote(id)
    console.log('in newVote votedAnecdote',votedAnecdote)
    dispatch(addNewVote(votedAnecdote.id))
    dispatch(displayNotificationVote(votedAnecdote.content))
    setTimeout(() => {dispatch(displayNotificationVote(''))}, 3000);    
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const initAnecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(initAnecdotes))
  }
}

export const insertNewAnecdote = (anecdoteContent) => {
  return async (dispatch) => {
    const initAnecdotes = await anecdotesService.createNewAnecdote(anecdoteContent) 
    dispatch(addNewAnecdote(initAnecdotes))
    dispatch(displayNotificationVote(initAnecdotes.content))
    setTimeout(() => {dispatch(displayNotificationVote(''))}, 5000);
  }
}

//export const {addNewVote,addNewAnecdote,setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer
