
/*
mongodb+srv://admin:123@cluster0.amfamoy.mongodb.net/?appName=Cluster0
*/
const express = require("express");
const app = express();
const port = 3000;
const logger = require("./logger");


app.use(logger);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
app.use(express.json(),);

app.get("/hello", (req, res) => {
  res.render("number.ejs", { name: "al anany abo yasein " });
});

app.get("/greet", (req, res) => {
  const numbers = [];
  for (let i = 0; i <= 5; i++) {
    numbers.push(i);
  }
  res.send(numbers);
});
// path parameter in req 
app.get("/getSum/:num1/:num2", (req, res) => {
  let num1 = req.params.num1;
  let num2 = req.params.num2;
  res.send(`numbers ${num1} x ${num2} = ${num1* num2}`)
});
/// body paramter 
app.get("/data1", (req, res) => {
let name = req.query.name;
let age = req.query.age;

  res.json({
    name: `Hello ${name}`,
     age: `Hello ${age}`
  })

});
