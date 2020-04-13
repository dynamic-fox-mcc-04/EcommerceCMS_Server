const express = require("express");
const app = express();
const router = require("./routes");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use("/", router);
app.use((err, req, res, next) =>
{

});

app.listen(process.env.PORT, console.log("Success running on Port " + process.env.PORT));