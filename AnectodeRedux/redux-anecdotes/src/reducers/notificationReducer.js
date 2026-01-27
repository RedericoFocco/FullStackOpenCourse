import { createSlice,current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState:'',
  reducers:{
    displayNotificationVote(state,action){
        console.log("state addNewVote in notification",state,action)
        return action.payload
    }
  }
})

export const {displayNotificationVote} = notificationSlice.actions
export default notificationSlice.reducer
