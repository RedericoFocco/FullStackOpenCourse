import { useSelector} from 'react-redux'

const Notification = () => {
  
  const notificationToDisplay = useSelector(({anecdotes,filter,notification})=>{
      console.log(`ANECDOTES:${anecdotes},FILTER:${filter},NOTIFICATION:${notification}`)
      return notification 
    }
    )

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  if (notificationToDisplay!=='')
    return <div style={style}>Voted {notificationToDisplay}!</div>
  else
    return <div/>
}

export default Notification
