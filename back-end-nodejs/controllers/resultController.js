const Result = require("../models/result");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

// Get all results
exports.getAllResults = catchAsync(async (req, res, next) => {
  const results = await Result.find()
    .populate("studentId", "name")
    .populate("examId", "name");

  res.status(200).json({
    status: "success",
    results: results.length,
    data: results,
  });
});

// Get a single result by ID
exports.getResult = catchAsync(async (req, res, next) => {
  const result = await Result.findById(req.params.id)
    .populate("studentId", "name")
    .populate("examId", "name")
    .populate("answers.questionId", "question");

  if (!result) {
    return next(new AppError(404, "Result not found"));
  }

  res.status(200).json({
    status: "success",
    data: result,
  });
});

// Delete a result by ID
exports.deleteResult = catchAsync(async (req, res, next) => {
  const result = await Result.findByIdAndDelete(req.params.id);

  if (!result) {
    return next(new AppError(404, "Result not found"));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Get results for a specific student
exports.getStudentResults = catchAsync(async (req, res, next) => {
  const results = await Result.find({ studentId: req.id })
    .populate("examId", "name")
    .populate("answers.questionId", "question");

  res.status(200).json({
    status: "success",
    results: results.length,
    data: results,
  });
});