const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    choices: {
      a: {
        type: String,
        required: true,
      },
      b: {
        type: String,
        required: true,
      },
      c: {
        type: String,
        required: true,
      },
      d: {
        type: String,
        required: true,
      },
    },
    correctAnswer: {
      type: String,
      enum: ["a", "b", "c", "d"],
      required: true,
    },
    difficulty: {
      type: Number,
      enum: [1, 2, 3],
      required: false,
    },
    exam: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Exam",
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;