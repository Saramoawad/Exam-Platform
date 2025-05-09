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

router.use(auth);

router
  .route("/")
  .get(getAllQuestions)
  .post(blockRoles("student"), createQuestion);


router
  .route("/:id")
  .get(getQuestion)
  .patch(blockRoles("student"), updateQuestion)
  .delete(blockRoles("student"), deleteQuestion);

module.exports = router;