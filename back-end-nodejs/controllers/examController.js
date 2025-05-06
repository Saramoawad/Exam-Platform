const Exam = require("../models/exam");
const Question = require("../models/question");
const { catchAsync } = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllExams = catchAsync(async (req, res, next) => {
  const exams = await Exam.find()
    .populate("user", "firstName lastName username")
    .populate("questions");
  if (exams.length == 0) {
    return next(new AppError(404, "No exams found"));
  }
  res.status(200).json({
    status: "success",
    data: exams,
  });
});

exports.addExam = catchAsync(async (req, res) => {
  let newExam = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  console.log(req.file);
  console.log(req.body);
  let exam = await Exam.create({
    ...newExam,
    image,
    user: req.id,
  });
  res.status(201).json({ status: "success", data: exam });
});

exports.getExamById = catchAsync(async (req, res) => {
  const { id } = req.params;
  let exam = await Exam.findById(id)
    .populate("user", "firstName lastName username")
    .populate("questions");
  if (!exam) {
    return next(new AppError(404, "exam not found"));
  }
  res.status(200).json({ status: "success", data: exam });
});

exports.updateExam = catchAsync(async (req, res) => {
  const {
    name,
    description,
    subject,
    totalMarks,
    passingMarks,
    level,
    duration,
    stageLevel,
  } = req.body;
  const { id } = req.params;
  const exam = await Exam.findById(id);
  if (!exam) {
    return next(new AppError(404, "exam not found"));
  }

  exam.name = name || exam.name;
  exam.description = description || exam.description;
  exam.subject = subject || exam.subject;
  exam.totalMarks = totalMarks !== undefined ? totalMarks : exam.totalMarks;
  exam.passingMarks =
    passingMarks !== undefined ? passingMarks : exam.passingMarks;
  exam.level = level || exam.level;
  if (duration !== undefined) exam.duration = duration;
  exam.stageLevel = stageLevel || exam.stageLevel;

  console.log(req.file)
  console.log(req.body)
  if (req.file) {
    exam.image = `/uploads/${req.file.filename}`;
  } else if (req.body.image === undefined || req.body.image === "") {
    exam.image = exam.image;
  }

  await exam.save();
  res.status(200).json({
    status: "success",
    message: "exam updated successfully",
  });
});

exports.deleteExam = catchAsync(async (req, res) => {
  const { id } = req.params;
  const exam = await Exam.findById(id);
  if (!exam) {
    return next(new AppError(404, "exam not found"));
  }
  await exam.deleteOne();
  res
    .status(200)
    .json({ status: "success", message: "exam deleted successfully" });
});
