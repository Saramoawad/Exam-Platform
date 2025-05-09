const mongoose = require("mongoose");

const resultSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    examId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Exam",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    passed: {
      type: Boolean,
      required: true,
    },
    answers: [
      {
        questionId: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Question",
          required: true,
        },
        selectedAnswer: {
          type: String,
          required: false,
        },
        correctAnswer: {
          type: String,
          required: true,
        },
        marks: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;