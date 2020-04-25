if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes/index.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)
app.use(errorHandler)

module.exports = app