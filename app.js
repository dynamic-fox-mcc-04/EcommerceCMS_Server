const express = require("express");
const app = express();
const router = require("./routes");
const cors = require("cors");
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use("/", router);
app.use((err, req, res, next) =>
{
    return res.status(500).json(err);
});

module.exports = app;