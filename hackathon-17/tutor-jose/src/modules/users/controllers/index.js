import { request, response } from "express";
import { UserModel } from "../entity/index.js";
import bcrypt from "bcryptjs";

const registerUserController = async (req = request, res = response) => {
  console.log(req.body);
  const { username, email, password, role, firstName, lastName } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({
    username,
    email,
    password: hashedPassword,
    role: role ?? "user",
    firstName,
    lastName: lastName ?? null,
  });

  return res.status(201).json({
    statusCode: 201,
    message: "User created",
    data: {
      user: newUser,
    },
  });
};

const geUsersController = async (req = request, res = response) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({ message: "Access denied" });
  }
  const users = await UserModel.findAll();

  res.status(200).json(users);
};
export { registerUserController, geUsersController };
