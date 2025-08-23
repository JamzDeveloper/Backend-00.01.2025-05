import { json, request, response } from "express";
import bcrypt from "bcryptjs";

import { UserModel } from "../model/user.model.js";

const registerUserController = async (req = request, res = response) => {
  console.log(req.body);
  const { username, email, password, role, firstName } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username,
    email,
    password: hashedPassword,
    role,
    firstName,
  });
  await newUser.save();

  return res.status(201).json({
    statusCode: 201,
    message: "User created",
    data: {
      user: newUser,
    },
  });
};

export { registerUserController };
