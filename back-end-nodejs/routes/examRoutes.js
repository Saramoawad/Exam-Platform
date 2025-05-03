const express = require("express");
const multer = require("multer");

const examController = require("../controllers/examController");
const { auth, blockRoles } = require("../middlewares/authMiddleware");
const { createExamSchema, updateExamSchema } = require("../validations/examValidation");
const { validation } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.use(auth);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error("Only JPEG, JPG, PNG, and GIF images are allowed"),
      false
    );
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

router.get("/", examController.getAllExams);

router.get("/:id", examController.getExamById);

router.post(
  "/",
  blockRoles("student"),
  validation(createExamSchema),
  upload.single("image"),
  examController.addExam
);

router.delete(
  "/:id",
  blockRoles("student"),
  examController.deleteExam
);

router.patch(
  "/:id",
  blockRoles("student"),
  validation(updateExamSchema),
  upload.single("image"),
  examController.updateExam
);


module.exports = router;
