const express = require("express");
const userController = require("../controllers/users_controller ");
const userRouter=  express.Router();
const verifyToken = require("../middilewares/verify_jwt");  
// Multer setup for file uploads
const multer = require("multer");
const { storage, fileFilter} = require("../middilewares/file_filter"); 
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Define route for getting all users
userRouter
  .route("/")
  .get(verifyToken,userController.getAllUsers);

  // define route for registering a user
userRouter
  .route("/register")
  .post( upload.single('avatar'),userController.registerUser);

  // define route for login a user
userRouter
  .route("/login")
  .post(userController.loginUser);

module.exports = userRouter;
