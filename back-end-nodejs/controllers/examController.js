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

  // Calculate score
  let score = 0;
  const totalMarks = exam.totalMarks || 0;
  const questionDetails = [];

  for (const answer of answers) {
    const question = exam.questions.find(q => q._id.toString() === answer.questionId);
    if (!question) {
      return next(new AppError(400, `Question ${answer.questionId} not found in this exam`));
    }

    const isCorrect = question.correctAnswer === answer.answer;
    const marks = isCorrect ? question.marks : 0;

    score += marks;
    questionDetails.push({
      questionId: question._id,
      selectedAnswer: answer.answer,
      correctAnswer: question.correctAnswer,
      marks: marks,
    });
  }

  // Create result
  const result = await Result.create({
    studentId: req.id,
    examId: exam._id,
    score,
    passed: score >= (exam.passingMarks || 0),
    answers: questionDetails,
  });

  res.status(200).json({
    status: "success",
    data: {
      score,
      totalMarks,
      passed: result.passed,
      resultId: result._id,
    },
  });
});