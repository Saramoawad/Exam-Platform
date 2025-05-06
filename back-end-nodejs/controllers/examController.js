const Exam = require("../models/exam");
const Question = require("../models/question");
const Result = require("../models/result");
const { catchAsync } = require("../utils/catchAsync");
const AppError = require("../utils/appError");





// sara-----------------------------------------------------------------------------------
exports.submitExam = catchAsync(async (req, res, next) => {
  const examId = req.params.id;
  const answers = req.body.answers;

  const exam = await Exam.findById(examId).populate("questions");
  if (!exam) {
    return next(new AppError(404, "Exam not found"));
  }

  if (!answers || !Array.isArray(answers)) {
    return next(new AppError(400, "Answers must be an array"));
  }

  let score = 0;
  const totalQuestions = exam.questions.length;
  const processedAnswers = answers.map(answer => {
    const question = exam.questions.find(q => q._id.toString() === answer.questionId);
    if (!question) {
      throw new AppError(404, `Question ${answer.questionId} not found`);
    }

    const isCorrect = question.correctAnswer === answer.answer;
    const marks = isCorrect ? 1 : 0; // 1 mark per correct answer
    if (isCorrect) score++;

    return {
      questionId: answer.questionId,
      selectedAnswer: answer.answer,
      correctAnswer: question.correctAnswer,
      marks: marks
    };
  });

  const passed = score >= totalQuestions / 2; // Pass if score >= 50%

  const submission = await Result.create({
    studentId: req.id || null,
    examId: exam._id,
    score: score,
    passed: passed,
    answers: processedAnswers,
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