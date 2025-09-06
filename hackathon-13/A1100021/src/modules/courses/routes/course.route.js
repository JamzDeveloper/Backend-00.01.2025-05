import { Router } from "express";
import {
  registerCourseController,
  updateCourseController,
  deleteCourseController,
  findByIdCourseController,
  listCourseController,
} from "../controllers/course.controller.js";

const router = Router();

router.post("/register", registerCourseController);
router.put("/update", updateCourseController);
router.delete("/delete", deleteCourseController);
router.post("/find", findByIdCourseController);
router.get("/list", listCourseController);

export default router;