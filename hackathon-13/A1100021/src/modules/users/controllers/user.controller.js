import { json, request, response } from "express";
import bcrypt from "bcryptjs";

import { UserModel } from "../model/user.model.js";

const registerUserController = async (req = request, res = response) => {
  try {
    const { username, email, password, role, firstName } = req.body;

    if (!username || !email || !password || !role || !firstName) {
      return res.status(400).json({
        error: "username, email, password, role, firstName are required",
      });
    }

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
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const listUserController = async (req = request, res = response) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json({
      statusCode: 200,
      message: "User List",
      data: users,
    });
  } catch (error) {
    console.error("Error listing user:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

export { registerUserController, listUserController };
