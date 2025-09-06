import { Router } from "express";
import {
  registerOrderController,
  updateOrderController,
  deleteOrderController,
  findByIdOrderController,
  listOrderController,
} from "../controllers/order.controller.js";

const router = Router();

router.post("/register", registerOrderController);
router.put("/update", updateOrderController);
router.delete("/delete", deleteOrderController);
router.post("/find", findByIdOrderController);
router.get("/list", listOrderController);

export default router;