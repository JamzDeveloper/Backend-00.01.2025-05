require("dotenv").config();

const { Server } = require("./server");

const server1 = new Server();


server1.listen();

// const express = require("express");

// const port = process.env.PORT || 3000;

// const app = express();

// app.listen(port, () => {
//   console.log(`listening in port ${port}`);
// });
