import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true, min: 0, max: 100 },
  expiresAt: { type: Date, required: true },
  active: { type: Boolean, default: true }
});

const CouponModel = mongoose.model("Coupon", CouponSchema);

export { CouponModel };