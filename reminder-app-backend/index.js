require('dotenv').config()
const cors = require("cors")
const { default: mongoose } = require('mongoose')
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cors())
app.use(urlencodedParser)
app.use(jsonParser)
mongoose.connect('mongodb://localhost:27017/reminderAppDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log("Database connected"));

const reminderSchema = new mongoose.Schema({
    reminderMsg: String,
    remindAt: String,
    isReminded: Boolean
})

const Reminder = new mongoose.model("reminder", reminderSchema)

// const accountSid = process.env.ACCOUNT_SID;
// const authToken = process.env.AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

// setInterval(() => {
//     Reminder.find({}, (err, reminderList) => {
//         if (err)
//             console.log(err)
//         if (reminderList)
//             res.send(reminderList)
//     })

// })

// client.messages
//     .create({
//         body: 'hello',
//         from: 'whatsapp:+14155238886',
//         to: 'whatsapp:+919353585106'
//     })
//     .then(message => console.log(message.sid))
//     .done();

//API
app.get("/getAllReminder", (req, res) => {

    Reminder.find({}, (err, reminderList) => {
        if (err)
            console.log(err)
        if (reminderList)
            res.send(reminderList)
    })
})
app.post("/addReminder", jsonParser, (req, res) => {

    console.log(req.body)
    const {
        reminderMsg,
        remindAt
    } = req.body
    const reminderBody = new Reminder({
        reminderMsg,
        remindAt,
        isReminded: false
    })

    reminderBody.save(err => {

        if (err)
            console.log(err)
        Reminder.find({}, (err, reminderList) => {
            if (err)
                console.log(err)
            if (reminderList)
                res.send(reminderList)
        })
    })
})
app.post("/deleteReminder", (req, res) => {
    Reminder.deleteOne({
            _id: req.body.id
        },
        () => {
            Reminder.find({}, (err, reminderList) => {
                if (err)
                    console.log(err)
                if (reminderList)
                    res.send(reminderList)
            })
        })
})
app.get("/", (req, res) => {
    res.send("HELLo")
})
app.listen(9001, () => { console.log("Started") })