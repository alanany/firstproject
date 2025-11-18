const os= require("node:os");
// const logger = require("./logger");
// console.log("OS platform:", os.platform());
// console.log("OS release:", os.release());
// console.log("OS total memory:", os.totalmem());

const fs = require("node:fs");
// fs.readFile("./file.text", "utf8", (err, data) => {
//   if (err) {
//     console.error("Error reading file:", err);
//     return;
//   }                
//   console.log("File content:", data);
// }); 
fs.readFile("./user.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }                
  console.log("File content:", data);
}); 

fs.writeFile("./file.txt", "Hello, this is a new this!", (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  } 
  fs.appendFile( "./file.txt", "\nThis is a new line.", (err) => {
    if (err) {
      console.error("Error appending to file:", err);
      return;
    }   
  })

  
});




// console.log(__dirname)
// console.log(__filename)
// logger.logInfo("This is an informational message from app.js");