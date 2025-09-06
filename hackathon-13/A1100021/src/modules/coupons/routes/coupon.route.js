import { Router } from "express";
import {
  registerCouponController,
  updateCouponController,
  deleteCouponController,
  findByIdCouponController,
  listCouponController,
} from "../controllers/coupon.controller.js";

const router = Router();

router.post("/register", registerCouponController);
router.put("/update", updateCouponController);
router.delete("/delete", deleteCouponController);
router.post("/find", findByIdCouponController);
router.get("/list", listCouponController);

export default router;