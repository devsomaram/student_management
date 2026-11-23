const express = require("express");
const cors = require("cors");

const app = express();
const studentRoutes = require("./routes/student.route");

// Middleware ===============
app.use(cors());
app.use(express.json());

// Test route ============
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management API is running",
  });
});
app.use("/api/students", studentRoutes);

module.exports = app;
