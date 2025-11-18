const AppError = require("../utility/app_error");
const httpStatus = require("../utility/http_status");

allowedUserRoles = (...allowedRoles) => {
    //...allowedRoles  is an array of roles passed as arguments
  return (req, res, next) => {
    try {   
        const userRole = req.user.role; 
        if (!allowedRoles.includes(userRole)) {
          const error = AppError.createError({
            message: "You do not have permission to perform this action",   
            statusCode: httpStatus.FAILL,
            status: 403,
          });
          return next(error);
        }   
        next();
    } catch (err) {

        const error = AppError.createError({        
            message: "Authorization error",    
            statusCode: httpStatus.FAILL,    
            status: 403,    
            });
        next(error);
    }
  };    
};  
module.exports = allowedUserRoles;