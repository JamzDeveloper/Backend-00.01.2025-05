import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { check } from "express-validator";
import { validateField } from "../../../middleware/validate-field.middleware.js";

const router = Router();

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateField,
  ],
  login
);

export { router as AuthRoute };
