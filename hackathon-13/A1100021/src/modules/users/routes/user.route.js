import { Router } from "express";
import { listUserController, registerUserController } from "../controllers/user.controller.js";
import { verifyToken } from "../../middleware/auth.jwt.middleware.js";

const router = Router();

router.post("/register", registerUserController);

router.get("/list", verifyToken, listUserController);

export default router;