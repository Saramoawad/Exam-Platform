const Question = require("../models/question");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

// Create a new question
exports.createQuestion = catchAsync(async (req, res, next) => {
  const { question, choices, correctAnswer, difficulty, exam } = req.body;

  const newQuestion = await Question.create({
    question,
    choices,
    correctAnswer,
    difficulty,
    exam,
    user: req.id, // From auth middleware
  });

  res.status(201).json({
    status: "success",
    data: newQuestion,
  });
});

// Get all questions
exports.getAllQuestions = catchAsync(async (req, res, next) => {
  const questions = await Question.find()
    .populate("exam", "title")
    .populate("user", "name");

  res.status(200).json({
    status: "success",
    results: questions.length,
    data: questions,
  });
});

// Get a single question by ID
exports.getQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findById(req.params.id)
    .populate("exam", "title")
    .populate("user", "name");

  if (!question) {
    return next(new AppError(404, "Question not found"));
  }

  res.status(200).json({
    status: "success",
    data: question,
  });
});

// Update a question by ID
exports.updateQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!question) {
    return next(new AppError(404, "Question not found"));
  }

  res.status(200).json({
    status: "success",
    data: question,
  });
});

// Delete a question by ID
exports.deleteQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findByIdAndDelete(req.params.id);

  if (!question) {
    return next(new AppError(404, "Question not found"));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});