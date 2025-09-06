import { json, request, response } from "express";
import { PaymentModel } from "../model/payment.model.js";
import { OrderModel } from "../../orders/model/order.model.js";

const completePaymentController = async (req = request, res = response) => {
  try {
    const { idOrder, amount, method } = req.body;

    if (!idOrder || !amount || !method) {
      return res.status(400).json({
        error: "idOrder, amount, method are required",
      });
    }

    const updatedPayment = await PaymentModel.findOneAndUpdate(
      { idOrder: idOrder },
      {
        amount: amount,    
        method: method,    
        status: "completed",
        paidDate: new Date()
      },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({
        statusCode: 404,
        message: `Payment with id Orden ${idOrder} not found`,
      });
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      idOrder,
      { status: "completed" },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        statusCode: 404,
        message: `Order with id ${idOrder} not found`,
      });
    }

    return res.status(201).json({
      statusCode: 201,
      message: "Payment completed",
      data: {
        payment: updatedPayment,
        order: updatedOrder,
      },
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

export {
  completePaymentController
};