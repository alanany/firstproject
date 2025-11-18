const mongoose=require("mongoose");
const courseSchema=new mongoose.Schema({
   name:{
    required:true ,
    unique:true,
    type:String,
   },
   level:{
    required:true ,
    type:String,
   }   ,
   price:{
    type: Number,
    required:true
   }
    
});
module.exports=mongoose.model("Course",courseSchema);
//هنا بيعمل كولكشن اتوماتيك باسم الكورسيز فى الداتا بيز