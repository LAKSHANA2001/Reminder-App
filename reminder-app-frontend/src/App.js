import './App.css'
import React, { useState, useEffect } from "react"
import axios from "axios"
import DateTimePicker from "react-datetime-picker"
import Card from './components/card'
function App() {

    const [reminderMsg, setReminderMsg] = useState("")
    const [remindAt, setRemindAt] = useState()
    const [reminderList, setReminderList] = useState([])

    useEffect(() => {
        try {
            axios.get("http://localhost:9001/getAllReminder").then(res => {
                console.log(res)
                setReminderList(res.data)

            })
        } catch (err) {
            console.log(err)
        }
    }, [])

    const addReminder = () => {
        try {
            axios.post("http://localhost:9001/addReminder", { "reminderMsg":reminderMsg, "remindAt":remindAt })
                .then(res => setReminderList(res.data))
            setReminderMsg("")
            setRemindAt()
        } catch (err) {
            console.log(err)
        }

    }

    const deleteReminder = (id) => {
        try {
            axios.post("http://localhost:9001/deleteReminder", { id })
                .then(res => setReminderList(res.data))
        } catch (err) {
            console.log(err)
        }

    }

    return ( <div className = "App" >
        <div className = "homepage" >

        <div className = "homepage_header" >
        <h1> Remind Me🙋‍♂️😁 </h1> <
        input type = "text"
        placeholder = "Reminder notes here..."
        value = { reminderMsg }
        onChange = { e => setReminderMsg(e.target.value) }
        /> <
        DateTimePicker value = { remindAt }
        onChange = { setRemindAt }
        minDate = { new Date() }
        minutePlaceholder = "mm"
        hourPlaceholder = "hh"
        dayPlaceholder = "DD"
        monthPlaceholder = "MM"
        yearPlaceholder = "YYYY" /
        >
        <div className = "button"
        onClick = { addReminder } > Add Reminder </div> </div >


        <div className = "homepage_body" > {
            reminderList.map(reminder => ( 
                <Card key ={reminder._id} reminderMsg={reminder.reminderMsg} remindAt={reminder.remindAt} deleteReminder={deleteReminder} id={reminder._id}/>
            ))
        } </div>

        </div>  </div >
    )
}

export default App;