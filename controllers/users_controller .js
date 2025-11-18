const { validationResult } = require("express-validator");
const User = require("../models/user_model");
const httpStatus = require("../utility/http_status");
const AppError = require("../utility/app_error");
const asyncWrapper = require("../middilewares/async_wrapper");
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_key";
const bcrypt = require("bcryptjs");
const { request } = require("express");
const generateJWT = require("../middilewares/generate_jwt");
const jwt = require("jsonwebtoken");
// Get All Users
const getAllUsers = asyncWrapper(async (req, res) => {
  console.log(req.header("authorization"));
  //use pagination
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false, password: false })
    .skip(skip)
    .limit(limit);
  res.json({ status: httpStatus.SUCCESS, data: { users } });
});





// register User
const registerUser = asyncWrapper(async (req, res, next) => {
  console.log(req.body);
  console.log( req.file['filename']);
  const ifUserExist = await User.findOne({ email: req.body.email });

  // check if user already exists
  if (ifUserExist) {
    const error = AppError.createError({
      message: "User with this email already exists",
      statusCode: httpStatus.FAILL,
      status: 400,
    });
    return next(error);
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = AppError.createError({
      message: errors.array()[0]["msg"],
      statusCode: httpStatus.FAILL,
      status: 400,
    });
    return next(error);
  }
  // hash password
  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashPassword;
  
  // create new user
  const user = User({
    firstName: req.body.firstName,
    email: req.body.email,
    password: hashPassword,
    lastName: req.body.lastName,
   role: req.body.role,
   avatar: req.file.filename,
  });
 // generate jwt token
  const token = await generateJWT(user, next);
  user.token = token;
 
  // remove password from user object before sending response

  const userObj =await user.toObject();
  delete userObj.password;
  // save user to database
  await user.save();
  //send response
  res.status(201).json({ status: httpStatus.SUCCESS, data: { user: userObj } });
});










// login User
const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.query;
  if (!email || !password) {
    const error = AppError.createError({
      message: "Please provide email and password",
      statusCode: httpStatus.FAILL,
      status: 400,
    });
    return next(error);
  }
  const user = await User.findOne({ email });
  if (!user) {
    const error = AppError.createError({
      message: "User not found",
      statusCode: httpStatus.FAILL,
      status: 404,
    });
    return next(error);
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    const error = AppError.createError({
      message: "Invalid password",
      statusCode: httpStatus.FAILL,
      status: 401,
    });
    return next(error);
  }
  // remove password from user object before sending response
  const userObj = user.toObject();
  delete userObj.password;
  // generate new jwt token
  const token = await generateJWT(user, next);
  //update token in database
  await User.findByIdAndUpdate(
  userObj._id,
  { token: token },
  { new: true }
)
  //send response
  res.json({
    status: httpStatus.SUCCESS,
    message: "User Logged Sucessfully ",
    user: userObj,
  });
});

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
};
