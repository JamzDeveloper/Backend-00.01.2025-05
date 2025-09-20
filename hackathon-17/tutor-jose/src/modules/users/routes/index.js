import { Router } from "express";
import { check } from "express-validator";
import { validateField } from "../../../middleware/validate-field.middleware.js";
import {
  registerUserController,
  geUsersController,
} from "../controllers/index.js";
import { verifyToken } from "../../../middleware/auth.jwt.middleware.js";

const router = Router();

router.post(
  "/",
  [
    check("firstName", "FirstName is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    check("username", "Username is required").not().isEmpty(),
    validateField,
  ],
  registerUserController
);

router.get("/", verifyToken, geUsersController);

export { router as UserRoute };
