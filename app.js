require('dotenv').config() // kamu akan pakai semua require yang ada di .env, jadi kamu tidak perlu khawatir development/testing
const cors = require("cors")
const express = require('express')
const app = express()
const port = process.env.PORT

const errorHandler = require("./middlewares/errorHandler.js")
const router = require("./routers/index.js")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/', router)

app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
// module.exports = app