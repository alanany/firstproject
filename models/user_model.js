const mongoose=require("mongoose");
const validator=require("validator");
const { validate } = require("./course_model");
const UserRoles = require("../utility/user_roles");
const userchema=new mongoose.Schema({
   firstName:{
    required:[  true,"First Name is required"] ,
    
   type:String,
   },
   lastName:{
    required:[  true,"Last Name is required"] ,
    type:String,
   }   ,
   email:{
    type:String,
    required:[  true,"Email is required"],  
    unique:[    true,"Email must be unique"  ],
    validate: [validator.isEmail,"Invalid email format"]   ,
} ,
password:{
    type:String,
    required:[  true,"Password is required"],
    //validate:[validator.isStrongPassword,"Password is not strong enough"],
   },
   token:{
    type:String,
   },
   role:{
    type:String,
    enum:[UserRoles.USER,UserRoles.ADMIN,UserRoles.MANAGER], 
    default:UserRoles.USER,
   },
   avatar:{
    type:String,
    default:"uploads/avatar.png",}
});
module.exports=mongoose.model("User",userchema);
//هنا بيعمل كولكشن اتوماتيك باسم اليوزر فى الداتا بيز