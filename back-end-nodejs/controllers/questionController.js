const Question = require("../models/question");
const Exam = require("../models/exam");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

exports.createQuestion = catchAsync(async (req, res, next) => {
  const question = req.body;
  const newQuestion = await Question.create({
    ...question,
    user: req.id,
  });
  await Exam.findByIdAndUpdate(
    question.exam,
    { $push: { questions: newQuestion._id } },
    { new: true }
  );
  console.log(newQuestion);
  res.status(201).json({ status: "success", data: newQuestion });
});

exports.getAllQuestions = catchAsync(async (req, res, next) => {
  const { examId } = req.query;
  const filter = examId ? { exam: examId } : {};
  const questions = await Question.find(filter).populate("exam", "name");
  res.status(200).json({
    status: "success",
    results: questions.length,
    data: questions,
  });
});

exports.getQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findById(req.params.id)
    .populate("exam", "name")
    .populate("user", "firstName lastName username");
  if (!question) {
    return next(new AppError(404, "Question not found"));
  }
  res.status(200).json({
    status: "success",
    data: question,
  });
});

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

exports.deleteQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findByIdAndDelete(req.params.id);
  if (!question) {
    return next(new AppError(404, "Question not found"));
  }
  return res.status(204).json({
    status: "success",
    data: null,
  });
});
