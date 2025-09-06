import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "../modules/users/routes/user.route.js";
import authRoute from "../modules/auth/routes/auth.route.js";
import courseRoute from "../modules/courses/routes/course.route.js";
import couponRoute from "../modules/coupons/routes/coupon.route.js";
import orderRoute from "../modules/orders/routes/order.route.js";
import paymentRoute from "../modules/payments/routes/payment.route.js";

class Server {
  constructor() {
    this.port = process.env.PORT || 3000;
    this.mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/courses_sales";
    this.userPath = "/users";
    this.authPath = "/auth";
    this.coursePath = "/courses";
    this.couponPath = "/coupons";
    this.orderPath = "/orders";
    this.paymentPath = "/payments";
    this.app = express();

    this.middleware();

    this.routes();

    this.dbConnection();
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.send("Api online");
    });

    // users
    this.app.use(this.userPath, userRoute);
    this.app.use(this.authPath, authRoute);
    
    // courses
    this.app.use(this.coursePath, courseRoute);

    // coupons
    this.app.use(this.couponPath, couponRoute);

    // orders
    this.app.use(this.orderPath, orderRoute);    
    
    // payments
    this.app.use(this.paymentPath, paymentRoute);
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