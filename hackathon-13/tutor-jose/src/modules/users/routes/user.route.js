import { Router } from "express";
import { listUserController, registerUserController } from "../controllers/user.controller.js";
import { verifyToken } from "../../middleware/auth.jwt.middleware.js";

const router = Router();

router.post("/", registerUserController);

router.get("/",verifyToken, listUserController);
export default router;
