require('dotenv').config()
require('./config/db.config')()

const express = require('express')
const app = express()
app.use(express.json())








app.listen(Number(process.env.PORT), () => {
    console.log(`Server up and running on port: ${process.env.PORT}`)
})