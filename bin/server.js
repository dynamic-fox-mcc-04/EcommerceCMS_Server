const app = require("../app");
const http = require("http");

const server = http.createServer(app);

server.listen(process.env.PORT, console.log("Success running on Port " + process.env.PORT));