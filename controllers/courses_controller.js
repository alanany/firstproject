const { validationResult } = require("express-validator");
const Course = require("../models/course_model");
const httpStatus = require("../utility/http_status");
const AppError = require("../utility/app_error");
const asyncWrapper = require("../middilewares/async_wrapper");
const getCourseById = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  const error = AppError.createError({
    message: "Course not found",
    statusCode: httpStatus.FAILL,
    status: 404,
  });
  if (!course) return next(error);
  res.json({ status: httpStatus.SUCCESS, data: { course } });
});

const getAllCourses = asyncWrapper(async (req, res) => {
  //use pagination
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;
  // Filter courses with price greater than 1000
  //const courses = await Course.find({price: { $gt: 1000 }});
  //const courses = await Course.find({"__v":false});
  const courses = await Course.find({}, { __v: false }).skip(skip).limit(limit);
  res.json({ status: httpStatus.SUCCESS, data: { courses } });
});

const createCourse = asyncWrapper(async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.status(201).json({ status: httpStatus.SUCCESS, data: { course } });
  const errors = validationResult(req);
 if (!errors.isEmpty()){
     const error = AppError.createError({
     message: errors.array()[0]["msg"],
     statusCode: httpStatus.FAILL,
     status: 400,
   });
    return next(error);
   } 
});

const updateCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await Course.findByIdAndUpdate(courseId, req.body, {
    new: true,
  });
  if (!course) {
    const error = AppError.createError({
      message: "Course not found",
      statusCode: httpStatus.FAILL,
      status: 404,
    });
    return next(error);
  }
  res.json({ status: httpStatus.SUCCESS, data: { course } });
});

const deleteCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await Course.findByIdAndDelete(courseId);
  if (!course) {
    const error = AppError.createError({
      message: "Course not found",
      statusCode: httpStatus.FAILL,
      status: 404,
    });
    return next(error);
  }
  res.json({
    status: httpStatus.SUCCESS,
    message: "Course deleted successfully",
  });
});

module.exports = {
  createCourse,
  getCourseById,
  getAllCourses,
  updateCourse,
  deleteCourse,
};
