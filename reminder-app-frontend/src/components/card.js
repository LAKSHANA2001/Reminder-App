import React from 'react'
const Card = (props) => {
  return (
    <div className = "reminder_card"
         >
                <h2> { props.reminderMsg?props.reminderMsg:"" } </h2> 
                <h3 > Remind Me at: </h3> 
                <p> { String(new Date(props.remindAt.toLocaleString(props.remindAt, { timezone: "Asia/Kolkata" }))) } </p> 
                <div className = "button"
                onClick = {
                    () => {
                        props.deleteReminder(props.id)
                    }
                } > Delete </div>   </div >
  )
}

export default Card