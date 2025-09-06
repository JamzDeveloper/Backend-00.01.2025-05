import { json, request, response } from "express";
import { CourseModel } from "../model/course.model.js";

const registerCourseController = async (req = request, res = response) => {
  try {
    const { name, description, img, cover, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        error: "At least the name and price are required",
      });
    }

    const newCourse = new CourseModel({
      name,
      description,
      img,
      cover,
      price,
    });

    await newCourse.save();

    return res.status(201).json({
      statusCode: 201,
      message: "Course created",
      data: {
        course: newCourse,
      },
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateCourseController = async (req = request, res = response) => {
  try {
    const { id, name, description, img, cover, price, active } = req.body;

    if (!id) {
      return res.status(400).json({
        statusCode: 400,
        message: "Course id is required",
      });
    }

    if (!name || !price) {
      return res.status(400).json({
        error: "At least the name and price are required",
      });
    }
    
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        img,
        cover,
        price,
        active
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        statusCode: 404,
        message: `Course with id ${id} not found`,
      });
    }

    return res.status(201).json({
      statusCode: 201,
      message: "Course updated",
      data: {
        course: updatedCourse,
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

const deleteCourseController = async (req = request, res = response) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        statusCode: 400,
        message: "Course id is required",
      });
    }

    const deletedCourse = await CourseModel.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({
        statusCode: 404,
        message: `Course with id ${id} not found`,
      });
    }

    return res.status(201).json({
      statusCode: 201,
      message: "Course deleted",
      data: {
        course: deletedCourse,
      },
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const findByIdCourseController = async (req = request, res = response) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        statusCode: 400,
        message: "Course id is required",
      });
    }

    const course = await CourseModel.findById(id);

    if (!course) {
      return res.status(404).json({
        statusCode: 404,
        message: `Course with id ${id} not found`,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Course found",
      data: course,
    });
    
  } catch (error) {
    console.error("Error finding course:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const listCourseController = async (req = request, res = response) => {
  const courses = await CourseModel.find();

  return res.status(200).json({
    statusCode: 200,
    message: "Course List",
    data: courses,
  });
};

export {
  registerCourseController,
  updateCourseController,
  deleteCourseController,
  findByIdCourseController,
  listCourseController,
};