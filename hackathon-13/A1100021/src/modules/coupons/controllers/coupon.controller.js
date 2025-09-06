import { json, request, response } from "express";
import { CouponModel } from "../model/coupon.model.js";

const registerCouponController = async (req = request, res = response) => {
  try {
    const { code, discountPercentage, expiresAt } = req.body;

    if (!code || !discountPercentage || !expiresAt) {
      return res.status(400).json({
        error: "code, discountPercentage, expiresAt are required",
      });
    }

    const newCoupon = new CouponModel({
      code, 
      discountPercentage, 
      expiresAt
    });

    await newCoupon.save();

    return res.status(201).json({
      statusCode: 201,
      message: "Coupon created",
      data: {
        coupon: newCoupon,
      },
    });
  } catch (error) {
    console.error("Error creating coupon:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateCouponController = async (req = request, res = response) => {
  try {
    const { id, code, discountPercentage, expiresAt, active } = req.body;

    if (!id) {
      return res.status(400).json({
        statusCode: 400,
        message: "Coupon id is required",
      });
    }

    if (!code || !discountPercentage || !expiresAt) {
      return res.status(400).json({
        error: "code, discountPercentage, expiresAt are required",
      });
    }
    
    const updatedCoupon = await CouponModel.findByIdAndUpdate(
      id,
      {
        code,
        discountPercentage,
        expiresAt,
        active
      },
      { new: true }
    );

    if (!updatedCoupon) {
      return res.status(404).json({
        statusCode: 404,
        message: `Coupon with id ${id} not found`,
      });
    }

    return res.status(201).json({
      statusCode: 201,
      message: "Coupon updated",
      data: {
        coupon: updatedCoupon,
      },
    });
  } catch (error) {
    console.error("Error updating coupon:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const deleteCouponController = async (req = request, res = response) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        statusCode: 400,
        message: "Coupon id is required",
      });
    }

    const deletedCoupon = await CouponModel.findByIdAndDelete(id);

    if (!deletedCoupon) {
      return res.status(404).json({
        statusCode: 404,
        message: `Coupon with id ${id} not found`,
      });
    }

    return res.status(201).json({
      statusCode: 201,
      message: "Coupon deleted",
      data: {
        coupon: deletedCoupon,
      },
    });
  } catch (error) {
    console.error("Error deleting coupon:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const findByIdCouponController = async (req = request, res = response) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        statusCode: 400,
        message: "Coupon id is required",
      });
    }

    const coupon = await CouponModel.findById(id);

    if (!coupon) {
      return res.status(404).json({
        statusCode: 404,
        essage: `Coupon with id ${id} not found`,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Coupon found",
      data: coupon,
    });
    
  } catch (error) {
    console.error("Error finding coupon:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const listCouponController = async (req = request, res = response) => {
  const coupons = await CouponModel.find();

  return res.status(200).json({
    statusCode: 200,
    message: "Coupon List",
    data: coupons,
  });
};

export {
  registerCouponController,
  updateCouponController,
  deleteCouponController,
  findByIdCouponController,
  listCouponController,
};