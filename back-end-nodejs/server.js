// require packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// require files
const connectToDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const examRoutes = require("./routes/examRoutes");
const questionRoutes = require("./routes/questionRoutes");
const resultRoutes = require("./routes/resultRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

dotenv.config();

connectToDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/exams", examRoutes);
app.use("/questions", questionRoutes);
app.use("/results", resultRoutes);

app.use(errorHandler);

// 404 Middleware
app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "route not found",
  });
});

// Run Server
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
