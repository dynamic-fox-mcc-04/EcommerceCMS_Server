const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middlewere/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(router)
app.use(errorHandler)

module.exports = app