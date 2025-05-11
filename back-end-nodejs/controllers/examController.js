const Exam = require("../models/exam");
const Result = require("../models/result");
const Question = require("../models/question");
const { catchAsync } = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");

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
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;
  const { id } = req.params;
  const exam = await Exam.findById(id);
  if (!exam) {
    return next(new AppError(404, "exam not found"));
  }

  exam.name = name || exam.name;
  exam.description = description || exam.description;
  exam.subject = subject || exam.subject;
  exam.totalMarks = totalMarks || exam.totalMarks;
  exam.passingMarks = passingMarks || exam.passingMarks;
  exam.level = level || exam.level;
  if (duration !== undefined) exam.duration = duration;
  exam.stageLevel = stageLevel || exam.stageLevel;
  image ? (exam.image = image) : exam.image;

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
  await Question.deleteMany({ exam: id });
  await exam.deleteOne();
  res
    .status(200)
    .json({ status: "success", message: "exam deleted successfully" });
});

exports.submitExam = catchAsync(async (req, res, next) => {
  const examId = req.params.id;
  const answers = Array.isArray(req.body) ? req.body : req.body.answers;

  if (!Array.isArray(answers)) {
    return next(new AppError(400, "Answers must be an array"));
  }

  const exam = await Exam.findById(examId).populate("questions");
  if (!exam) {
    return next(new AppError(404, "Exam not found"));
  }

  const totalQuestions = exam.questions.length;
  if (totalQuestions === 0) {
    return next(new AppError(400, "No questions available for this exam"));
  }

  const questionIds = exam.questions.map((q) => q._id.toString());
  const validAnswers = ["a", "b", "c", "d"];
  for (const answer of answers) {
    if (
      !mongoose.isValidObjectId(answer.questionId) ||
      !questionIds.includes(answer.questionId.toString())
    ) {
      return next(
        new AppError(400, `Invalid question ID: ${answer.questionId}`)
      );
    }
    if (!validAnswers.includes(answer.answer)) {
      return next(new AppError(400, `Invalid answer value: ${answer.answer}`));
    }
  }

  const marksPerQuestion = exam.totalMarks / totalQuestions;
  let score = 0;

  const answerMap = new Map(
    answers.map((a) => [a.questionId.toString(), a.answer])
  );

  const processedAnswers = exam.questions.map((question) => {
    const questionId = question._id.toString();
    const selectedAnswer = answerMap.get(questionId);
    if (!selectedAnswer) {
      return {
        questionId: questionId,
        selectedAnswer: null,
        correctAnswer: question.correctAnswer,
        marks: 0,
      };
    }
    const isCorrect = question.correctAnswer === selectedAnswer;
    const marks = isCorrect ? marksPerQuestion : 0;
    if (isCorrect) score += marks;
    return {
      questionId: questionId,
      selectedAnswer: selectedAnswer,
      correctAnswer: question.correctAnswer,
      marks: marks,
    };
  });

  const passed = score >= exam.passingMarks;

  const submission = await Result.create({
    studentId: req.id,
    examId: exam._id,
    score: Math.round(score * 100) / 100,
    passed: passed,
    answers: processedAnswers,
    submittedAt: new Date(),
  });

  res.status(200).json({
    status: "success",
    message: "Exam submitted successfully",
    data: {
      submissionId: submission._id,
      score: submission.score,
      passed: submission.passed,
    },
  });
});
