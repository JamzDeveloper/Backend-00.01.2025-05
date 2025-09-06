import { json, request, response } from "express";
import { OrderModel } from "../model/order.model.js";
import { UserModel } from "../../users/model/user.model.js";
import { CouponModel } from "../../coupons/model/coupon.model.js";
import { CourseModel } from "../../courses/model/course.model.js";
import { PaymentModel } from "../../payments/model/payment.model.js";

const registerOrderController = async (req = request, res = response) => {
  try {
    const { idUser, courses, couponCode } = req.body;

    if (!idUser || !courses) {
      return res.status(400).json({
        error: "idUser, courses are required",
      });
    }

    const user = await UserModel.findById(idUser);

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: `User with id ${c.idCourse} not found`,
      });
    }

    for (const c of courses) {
      const course = await CourseModel.findById(c.idCourse);
      if (!course) {
        return res.status(404).json({
          statusCode: 404,
          message: `Course with id ${c.idCourse} not found`,
        });
      }
    }

    let coupon;

    if (couponCode) {
      coupon = await CouponModel.findOne({ code: couponCode });
      if (!coupon) {
        return res.status(404).json({
          statusCode: 404,
          message: `Coupon with code ${couponCode} not found`,
        });
      }
    }

    const total = courses.reduce((acc, course) => acc + course.unitPrice, 0);

    const newOrder = new OrderModel({
      idUser: idUser,
      courses: courses,    
      couponCode: couponCode || null,
      idCoupon: couponCode ? coupon._id : null,
      discountApplied: couponCode ? (total * (coupon.discountPercentage / 100)).toFixed(2) : 0,
      total: couponCode ? (total - (total * (coupon.discountPercentage / 100))).toFixed(2) : total.toFixed(2)
    });

    await newOrder.save();

    const newPayment = new PaymentModel({ idOrder: newOrder._id });

    await newPayment.save();

    return res.status(201).json({
      statusCode: 201,
      message: "Order created",
      data: {
        order: newOrder,
        payment: newPayment,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateOrderController = async (req = request, res = response) => {
  try {
    const { id, idUser, courses, couponCode, status } = req.body;

    if (!id) {
      return res.status(400).json({
        statusCode: 400,
        message: "Course id is required",
      });
    }
    
    if (!idUser || !courses) {
      return res.status(400).json({
        error: "idUser, courses are required",
      });
    }

    const user = await UserModel.findById(idUser);

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: `User with id ${c.idCourse} not found`,
      });
    }

    for (const c of courses) {
      const course = await CourseModel.findById(c.idCourse);
      if (!course) {
        return res.status(404).json({
          statusCode: 404,
          message: `Course with id ${c.idCourse} not found`,
        });
      }
    }

    let coupon;

    if (couponCode) {
      coupon = await CouponModel.findOne({ code: couponCode });
      if (!coupon) {
        return res.status(404).json({
          statusCode: 404,
          message: `Coupon with code ${couponCode} not found`,
        });
      }
    }

    const total = courses.reduce((acc, course) => acc + course.unitPrice, 0);

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      {
        idUser: idUser,
        courses: courses,    
        couponCode: couponCode || null,
        idCoupon: couponCode ? coupon._id : null,
        discountApplied: couponCode ? (total * (coupon.discountPercentage / 100)).toFixed(2) : 0,
        total: couponCode ? (total - (total * (coupon.discountPercentage / 100))).toFixed(2) : total.toFixed(2),
        status
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        statusCode: 404,
        message: `Order with id ${id} not found`,
      });
    }

    return res.status(201).json({
      statusCode: 201,
      message: "Order updated",
      data: {
        course: updatedOrder,
      },
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const deleteOrderController = async (req = request, res = response) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        statusCode: 400,
        message: "Order id is required",
      });
    }

    const deletedOrder = await OrderModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        statusCode: 404,
        message: `Order with id ${id} not found`,
      });
    }

    const deletedPayment = await PaymentModel.findOneAndDelete({ idOrder: id });

    if (!deletedPayment) {
      return res.status(404).json({
        statusCode: 404,
        message: `Payment with id Orden ${idOrder} not found`,
      });
    }
    return res.status(201).json({
      statusCode: 201,
      message: "Order deleted",
      data: {
        order: deletedOrder,
        payment: deletedPayment
      },
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const findByIdOrderController = async (req = request, res = response) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        statusCode: 400,
        message: "Order id is required",
      });
    }

    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({
        statusCode: 404,
        message: `Order with id ${id} not found`,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Order found",
      data: order,
    });
    
  } catch (error) {
    console.error("Error finding order:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const listOrderController = async (req = request, res = response) => {
  const orders = await OrderModel.find();

  return res.status(200).json({
    statusCode: 200,
    message: "Order List",
    data: orders,
  });
};

export {
  registerOrderController,
  updateOrderController,
  deleteOrderController,
  findByIdOrderController,
  listOrderController,
};