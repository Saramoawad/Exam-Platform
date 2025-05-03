const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const User = require("../models/user");
const { catchAsync } = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Result = require("../models/result");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (users.length === 0) {
    return next(new AppError(404, "No users found"));
  }
  res.status(200).json({ status: "success", data: users });
});

exports.addUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({ status: "success", data: user });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id != req.id && req.role != "teacher") {
    return next(new AppError(403, "you can't perform this action"));
  }
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return next(new AppError(404, "user not found"));
  }
  res
    .status(200)
    .json({ status: "success", message: "user deleted successfully" });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
    const updatedDocument = req.body;
  if (id != req.id && req.role != "teacher") {
    return next(new AppError(403, "you can't perform this action"));
  }
  if (req.body.password) {
    const salt = await bcryptjs.genSalt(10);
    req.body.password = await bcryptjs.hash(req.body.password, salt);
  }
  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    updatedDocument,
    { new: true, runValidators: true }
  );
  if (!updatedUser) {
    return next(new AppError(404, "user not found"));
  }
  return res.status(200).json({
    status: "success",
    message: "user updated successfully",
    data: updatedDocument,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new AppError(400, "you must provide email and password to login")
    );
  }
  let user = await User.findOne({ email });
  if (!user) {
    return next(new AppError(401, "invalid email or password"));
  }
  let isValid = await bcryptjs.compare(password, user.password);
  if (!isValid) {
    return next(new AppError(401, "invalid email or password"));
  }
  let token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
  res.status(200).json({
    status: "success",
    message: { token },
  });
});

exports.getResultsOfUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  if (userId != req.id && req.role == "student") {
    return next(new AppError(403, "you can't perform this action"));
  }
  if (!await User.findById(userId)) {
    return next(new AppError(404, "User not found"));
  }
  const results = await Result.find({ userId });
  if (results.length == 0) {
    return next(new AppError(404, "user has no results"));
  }
  res.status(200).json({
    status: "success",
    data: results,
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError(404, "user not found"));
  }
  // generate a random token of 32 bytes
  const resetToken = crypto.randomBytes(32).toString("hex");
  //   hash it in database
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.passwordResetCode = hashedToken;
  user.passwordResetExpires = Date.now() + 3600000; // 3600000s = 1hr
  await user.save();
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
    `,
  };
  await transporter.sendMail(mailOptions);
  res.status(200).json({ message: "Password reset email sent" });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetCode: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError(400, "Invalid or expired token"));
  }
  user.password = password;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res
    .status(200)
    .json({ status: "success", message: "password reset successfully" });
});
