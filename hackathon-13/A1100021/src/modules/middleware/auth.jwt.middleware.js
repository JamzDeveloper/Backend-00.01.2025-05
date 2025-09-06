import { request, response } from "express";
import jwt from "jsonwebtoken";

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

    console.log(decoded)
    // req.user = decoded.user;
    //findOne de userModel
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
