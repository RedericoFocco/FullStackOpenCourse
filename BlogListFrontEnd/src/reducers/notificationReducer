import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState:'',
  reducers:{
    displayNotification(state,action){
        console.log("state addNewVote in notification",state,action)
        return action.payload
    }
  }
})

const {displayNotification} = notificationSlice.actions 

export const Notify = (content,messageShownSec) => {
    return (dispatch) => {
        console.log('Notify content',content)
        dispatch(displayNotification(content))
        setTimeout(() => {dispatch(displayNotification(''))}, messageShownSec);
    }
}
export default notificationSlice.reducer
