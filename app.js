require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const errorHandlers = require('./middleware/errorHandlers')
const router = require('./routes')

app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.use(router)

app.use(errorHandlers)

module.exports = app;