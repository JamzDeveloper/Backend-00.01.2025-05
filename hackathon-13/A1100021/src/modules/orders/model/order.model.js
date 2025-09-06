import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courses: [
    {
      idCourse: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      unitPrice: { type: Number, required: true }
    }
  ],    
  couponCode: { type: String, default: null},
  idCoupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon', default: null},
  discountApplied: { type: Number, default: 0 },
  total: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" }
});

const OrderModel = mongoose.model("Order", OrderSchema);

export { OrderModel };