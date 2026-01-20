const express = require("express");
const cors = require("cors");
const app = express();
const assignmentRoutes = require("./routes/assignmentRoutes");
const studentRoutes = require("./routes/studentRoutes");
const bookRoutes = require("./routes/bookRoutes");

// basic logging for incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} -> ${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route
app.use("/api/v1/assignments", assignmentRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/books", bookRoutes);

// simple test endpoint
app.get("/api-test", (req, res) => {
  res.json({ status: "ok", message: "api-test working" });
});
// route-listing debug helper removed

module.exports = app;
