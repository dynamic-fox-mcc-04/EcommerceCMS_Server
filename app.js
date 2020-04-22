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
    if (err.name == "JsonWebTokenError")
        return res.status(400).json({"error" : "Token error"});
    else if (err.name == "SequelizeValidationError")
        return res.status(400).json(err.errors[0].message);
    else if (err.name == 'SequelizeDatabaseError')
        return res.status(400).json(err.parent);
    return res.status(500).json(err);
});

module.exports = app;