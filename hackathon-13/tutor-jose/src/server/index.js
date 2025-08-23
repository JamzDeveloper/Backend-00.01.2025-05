import express from "express";

import cors from "cors";

class Server {
  constructor() {
    this.port = process.env.PORT || 3000;
    this.app = express();

    this.middleware();

    this.routes();

    this.dbConnection();
  }

  routes() {
    this.app.get("/",(req,res)=>{
      res.send("Api online")
    })
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  async dbConnection() {}

  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening in port ${this.port}`);
    });
  }
}

export { Server };
