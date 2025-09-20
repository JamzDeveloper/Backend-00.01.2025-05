import { request, response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../modules/users/entity/index.js";

const verifyToken = async (req = request, res = response, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: "Token is required",
      });
    }

    const bearerToken = token.split(" ");

    const decoded = jwt.verify(bearerToken[1], process.env.JWT_SECRET);

    console.log(decoded);

    const userDb = await UserModel.findByPk(decoded.id);
    if (!userDb) {
      return res.status(401).json({
        statusCode: 401,
        message: "Token is required",
      });
    }

    req.user = userDb.dataValues;

    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
};

export { verifyToken };
