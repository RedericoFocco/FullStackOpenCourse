import { useSelector} from 'react-redux'

const Notification = () => {
  
  const notificationToDisplay = useSelector(({notification})=>{
      console.log(`NOTIFICATION:${notification}`)
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
    return <div style={style}>{notificationToDisplay}</div>
  else
    return <div/>
}

export default Notification
