const AppError = require("../utility/app_error");
const fileFilter = (req, file, cb) => {
 const fileType = file.mimetype.split("/")[0];
   console.log("File type:", fileType);

  if (fileType === "image") {
    return cb(null, true);
  } else {
    
   return cb(AppError.createError({ message: "Unsupported file format" }), false);
  }
};

const multer = require("multer");
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
      console.log("File uploaded:", file.originalname);

  }
});
module.exports = {  fileFilter, storage};