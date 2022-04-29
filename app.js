require('dotenv').config()
require('./config/db.config')()

const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors({ origin: process.env.REACT_APP_URL }))

const userRouter = require('./routes/users.routes')
app.use("/users", userRouter) 






app.listen(Number(process.env.PORT), () => {
    console.log(`Server up and running on port: ${process.env.PORT}`)
})