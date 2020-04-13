require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const PORT = process.env.PORT
const errHandler = require('./middleware/errorHandler')


app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.use(routes)

app.use(errHandler)

app.listen(PORT, ()=>{
    console.log('listening port', PORT);
})