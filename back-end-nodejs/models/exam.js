const mongoose = require("mongoose");

const examSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, "Exam name must be more than 2 letters"],
    },
    description: {
      type: String,
      required: true,
      minLength: [4, "Exam description must be more than 4 letters"],
    },
    subject: {
      type: String,
      required: true,
      minLength: [2, "Exam subject must be more than 2 letters"],
    },
    image: {
      type: String,
      required: false,
    },
    totalMarks: {
      type: Number,
      default: 100,
    },
    passingMarks: {
      type: Number,
      default: 60,
    },
    level: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true
    },
    duration: {
      type: Number, // write it in minutes
      min: 1,
    },
    stageLevel: {
      type: String,
      enum: [
        "Primary",
        "Elementary",
        "Secondary",
        "High School",
        "University",
        "Bachelor",
      ],
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    questions: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Question",
      },
    ],
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
