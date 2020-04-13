// if (process.env.NODE_ENV !== 'production') {
// }
require('dotenv').config();

const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')
// const PORT = process.env.PORT

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json()) 
app.use(routes)
// app.listen(PORT,()=>{
//     console.log("listening :" + PORT);    
// })
module.exports = app