import { request, response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../../users/entity/index.js";

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      statusCode: 400,
      message: "Field (email,password) is required",
    });
  }

  const userFound = await UserModel.findOne({
    where: {
      email,
    },
  });

  if (!userFound) {
    return res.status(400).json({
      statusCode: 400,
      message: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(password, userFound.password);
  if (!isMatch)
    return res
      .status(401)
      .json({ statusCode: 401, message: "Credentials incorrect" });

  const token = jwt.sign(
    {
      id: userFound.id,
      role: userFound.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return res.status(200).json({
    statusCode: 200,
    token,
    user: userFound,
  });
};

export { login };
