const Exam = require("../models/exam");
const Question = require("../models/question");
const Result = require("../models/result");
const { catchAsync } = require("../utils/catchAsync");
const AppError = require("../utils/appError");





// sara-----------------------------------------------------------------------------------
exports.submitExam = catchAsync(async (req, res, next) => {
  const examId = req.params.id;
  const answers = req.body.answers; // Expected format: [{ questionId: "id", answer: "a" }, ...]

  // Find the exam
  const exam = await Exam.findById(examId).populate("questions");
  if (!exam) {
    return next(new AppError(404, "Exam not found"));
  }

  // Validate answers
  if (!answers || !Array.isArray(answers)) {
    return next(new AppError(400, "Answers must be an array"));
  }

  // Create submission record
  const submission = await Result.create({
    studentId: req.id || null, 
    examId: exam._id,
    answers: answers.map(answer => ({
      questionId: answer.questionId,
      selectedAnswer: answer.answer
    })),
    submittedAt: new Date()
  });

  res.status(200).json({
    status: "success",
    data: {
      message: "Exam submitted successfully",
      submissionId: submission._id
    }
  });
});