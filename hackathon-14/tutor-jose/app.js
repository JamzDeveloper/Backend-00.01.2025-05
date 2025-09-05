import express from "express";
import { createServer } from "node:http";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Server } from "socket.io";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const server = createServer(app);

const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat event", (data) => {
    //guardar en la base de datos

    //

    if (data.message.includes("@botIdat")) {
      io.emit("respuesta", data);
      data.username = "IdatBot🤖";
      //peticion a openIa para pntener respuesta -- TODO: tarea
      data.message = "Estoy trabajando en tu respuesta .....";
    }
    io.emit("respuesta", data);
  });

  //socket de actualizacion (id,mensaje )
  //emit "actualizacion"

});

//Para editar hacer una peticion rest(PATCH)
server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
