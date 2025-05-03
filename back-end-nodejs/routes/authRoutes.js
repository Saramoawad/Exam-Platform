const express = require("express");
const multer = require("multer");

const { auth, blockRoles } = require("../middlewares/authMiddleware");
const { createUserSchema, updateUserSchema } = require("../validations/userValidation");
const authController = require("../controllers/authController");
const loginSchema = require("../validations/login");
const { validation } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", auth, blockRoles("student"), authController.getAllUsers);

router.post("/", validation(createUserSchema), authController.addUser);

router.delete("/:id", auth, authController.deleteUser);

router.patch("/:id", auth, validation(updateUserSchema), authController.updateUser);

router.post("/login", validation(loginSchema), authController.login);

router.post("/forgot-password", authController.forgotPassword);

router.post("/reset-password/:token", authController.resetPassword);

router.get("/:userId/results", auth, authController.getResultsOfUser);

module.exports = router;
