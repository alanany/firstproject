const jwt = require("jsonwebtoken");
const AppError = require("../utility/app_error");
const httpStatus = require("../utility/http_status");
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_key";
module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    const error = AppError.createError({
    
                message: "No token provided",    
                statusCode: httpStatus.FAILL,    
                status: 401,    
              });
    next(error);
  }else{
     try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // نمرر بيانات المستخدم للـ API
   console.log("Decoded JWT:", decoded);
    next();
  } catch (err) {
 const error = AppError.createError({
    
                message: "Invalid or expired token" ,    
                statusCode: httpStatus.FAILL,    
                status: 403,    
              });
    next(error);
  }
  }

 
};
