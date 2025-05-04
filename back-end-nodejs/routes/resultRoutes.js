const express = require("express");
const { auth, blockRoles } = require("../middlewares/authMiddleware");
const {
  getAllResults,
  getResult,
  deleteResult,
  getStudentResults,
} = require("../controllers/resultController");

const router = express.Router();

// Protect all routes with auth middleware
router.use(auth);

// Routes accessible to teachers/admins (block "student" role)
router.get("/", blockRoles("student"), getAllResults); // Get all results
router.get("/my-results", getStudentResults); // Get results for the logged-in student
router.get("/:id", getResult); // Get a single result
router.delete("/:id", blockRoles("student"), deleteResult); // Delete a result

module.exports = router;