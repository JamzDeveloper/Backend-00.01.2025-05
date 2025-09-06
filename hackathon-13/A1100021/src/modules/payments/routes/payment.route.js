import { Router } from "express";
import { completePaymentController } from "../controllers/payment.controller.js";

const router = Router();

router.put("/complete", completePaymentController);

export default router;