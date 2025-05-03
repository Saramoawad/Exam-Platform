const joi = require("joi");

const baseExamSchema = joi.object({
  name: joi.string().trim().min(2),
  description: joi.string().min(4),
  subject: joi.string().min(2),
  image: joi.string(),
  totalMarks: joi.number().default(100),
  passingMarks: joi.number().default(60),
  level: joi.string().valid("easy", "medium", "hard"),
  duration: joi.number().min(1),
  stageLevel: joi
    .string()
    .valid(
      "Primary",
      "Elementary",
      "Secondary",
      "High School",
      "University",
      "Bachelor"
    ),
  user: joi.string().length(24).hex(),
  questions: joi.array().items(joi.string().length(24).hex()),
});

const createExamSchema = baseExamSchema.fork(
  ["name", "description", "subject", "stageLevel", "level"],
  (schema) => schema.required()
);

const updateExamSchema = baseExamSchema.min(1);

module.exports = {
  createExamSchema,
  updateExamSchema,
};
