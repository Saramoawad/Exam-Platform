const Result = require("../models/result");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

exports.getAllResults = catchAsync(async (req, res, next) => {
  const results = await Result.find()
    .populate("studentId", "username firstName lastName")
    .populate("examId", "name");
  if (!results) {
    return next(new AppError(404, "results not found"));
  }
  res.status(200).json({
    status: "success",
    results: results.length,
    data: results,
  });
});

exports.getResult = catchAsync(async (req, res, next) => {
  const result = await Result.findById(req.params.id)
    .populate("studentId", "username firstName lastName")
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

exports.getResult = catchAsync(async (req, res, next) => {
  const result = await Result.findById(req.params.id)
    .populate("studentId", "firstName lastName username")
    .populate("examId", "name totalMarks passingMarks")
    .populate("answers.questionId", "question choices"); // تأكد من استرجاع تفاصيل الأسئلة
  if (!result) {
    return next(new AppError(404, "Result not found"));
  }
  res.status(200).json({
    status: "success",
    data: result,
  });
});

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


exports.getMyAllResults = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find all results for the student
    const results = await Result.find({ studentId })
      .populate('examId', 'title') // Populate exam title for better display
      .select('examId score totalMarks createdAt');

    if (!results || results.length === 0) {
      return res.status(404).json({ message: 'No results found for this student' });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
