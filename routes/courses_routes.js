const express = require("express");
const courseController = require("../controllers/courses_controller");
const validatorSchema = require("../middilewares/validation_schema");
const verify_jwt = require("../middilewares/verify_jwt");
const UserRoles = require("../utility/user_roles");
const coursesRouter=  express.Router();
const allowedRoles = require("../middilewares/allowed_roles");
coursesRouter
  .route("/")
  .post(verify_jwt,courseController.createCourse)
  .get(courseController.getAllCourses);

coursesRouter
  .route("/:courseId")
  .delete(verify_jwt,allowedRoles(UserRoles.ADMIN,UserRoles.MANAGER),courseController.deleteCourse)
  .patch(verify_jwt,courseController.updateCourse)
  .get(verify_jwt,courseController.getCourseById);

module.exports = coursesRouter;
