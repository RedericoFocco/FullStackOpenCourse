export const filterAnecdote = filterString => {
  return  {
    type : 'FILTER',
    payload : { filterString }
  }
}

const filterReducer = (state = fullAnecdotes, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type)
  {
    case 'FILTER':
      return state.filter(s=>s.includes(action.payload))
    default :
      return state
  }
}

export default filterReducer
