import { createSlice,current } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState:'',
  reducers:{
    filterAnecdote(state,action){
      //console.log(current(state))
      return action.payload
    }
  }
})

/*export const filterAnecdote = filterString => {
  console.log('filterString',filterString)
  return  {
    type : 'FILTER',
    payload :  filterString
  }
}

const filterReducer = (state='', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type)
  {
    case 'FILTER':
      return action.payload
    default :
      return state
  }
}*/

export const {filterAnecdote} = filterSlice.actions
export default filterSlice.reducer
