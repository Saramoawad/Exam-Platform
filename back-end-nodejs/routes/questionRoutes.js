const express = require("express");
const { auth, blockRoles } = require("../middlewares/authMiddleware");
const {
  createQuestion,
  getAllQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

const router = express.Router();

// Protect all routes with auth middleware
router.use(auth);

// Routes accessible to teachers/admins (block "student" role)
router
  .route("/")
  .get(getAllQuestions) // Get all questions
  .post(blockRoles("student"), createQuestion); // Create a new question

router
  .route("/:id")
  .get(getQuestion) // Get a single question
  .patch(blockRoles("student"), updateQuestion) // Update a question
  .delete(blockRoles("student"), deleteQuestion); // Delete a question

module.exports = router;