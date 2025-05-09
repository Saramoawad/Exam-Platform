const express = require("express");
const { auth, blockRoles } = require("../middlewares/authMiddleware");
const {
  getAllResults,
  getResult,
  deleteResult,
  getStudentResults,
  getMyAllResults
} = require("../controllers/resultController");

const router = express.Router();

router.use(auth);

router.get("/", blockRoles("student"), getAllResults);
router.get("/my-results", getStudentResults);
router.get('/results/:studentId', getMyAllResults);

router.get("/:id", getResult);
router.delete("/:id", blockRoles("student"), deleteResult);

module.exports = router;
