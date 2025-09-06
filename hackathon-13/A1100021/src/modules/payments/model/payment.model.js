import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  idOrder: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  amount: { type: Number, default: 0 },          
  method: { type: String, default: null },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  paidDate: { type: Date, default: null }
});

const PaymentModel = mongoose.model("Payment", PaymentSchema);

export { PaymentModel };