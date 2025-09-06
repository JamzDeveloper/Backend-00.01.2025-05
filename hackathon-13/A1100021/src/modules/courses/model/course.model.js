import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  img: { type: String },
  cover: { type: String },
  price: { type: Number, required: true },
  active: { type: Boolean, default: true },
});

const CourseModel = mongoose.model("Course", CourseSchema);

export { CourseModel };