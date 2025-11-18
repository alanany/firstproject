const express = require("express");
const app = express();
const port = 3000;
const connectMango = require("./middilewares/mongo_connect.js");
const courserouters = require("./routes/courses_routes.js");
const userRouters = require("./routes/users_routes.js");
const cors = require('cors');
const path = require('path');
// Enable CORS
app.use(cors());
// Middleware
app.use(express.json());

// Connect DB then start server
(async () => {
  try {
    await connectMango();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Startup aborted due DB connection failure:", err);
    process.exit(1);
  }
})();
// Serve static files from the "uploads" directory
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')  ));
// Routes
app.use("/api/cources", courserouters);
app.use('/api/users', userRouters); 
// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Route not found",
    path: req.originalUrl
   
  });
});
// Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    status: err.status || 500,
    statusCode  : err.statusCode || "INTERNAL_SERVER_ERROR",
    message: err.message || 'Internal Server Error'
  });
});