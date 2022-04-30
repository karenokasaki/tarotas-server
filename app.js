require('dotenv').config()
require('./config/db.config')()

const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors({ origin: process.env.REACT_APP_URL }))


const userRouter = require('./routes/users.routes')
app.use("/users", userRouter)

const cardRouter = require('./routes/cards.routes')
app.use("/cards", cardRouter)

const oracleRouter = require('./routes/oracles.routes')
app.use("/oracles", oracleRouter)

const noteRouter = require('./routes/notes.routes')
app.use("/notes", noteRouter)

const tiragensRouter = require('./routes/tiragens.routes')
app.use("/tiragens", tiragensRouter)


app.listen(Number(process.env.PORT), () => {
    console.log(`Server up and running on port: ${process.env.PORT}`)
})