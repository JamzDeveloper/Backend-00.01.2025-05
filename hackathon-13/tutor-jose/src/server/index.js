import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "../modules/users/routes/user.route.js";
import authRoute from "../modules/auth/routes/auth.route.js";

class Server {
  constructor() {
    this.port = process.env.PORT || 3000;
    this.mongoUrl =
      process.env.MONGO_URL || "mongodb://localhost:27017/courses_sales";
    this.userPath = "/users";
    this.authPath = "/auth";
    this.app = express();

    this.middleware();

    this.routes();

    this.dbConnection();
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.send("Api online");
    });

    this.app.use(this.userPath, userRoute);
    this.app.use(this.authPath, authRoute);
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  async dbConnection() {
    await mongoose.connect(this.mongoUrl);
    console.log("MongoDb connected");
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening in port ${this.port}`);
    });
  }
}

export { Server };
