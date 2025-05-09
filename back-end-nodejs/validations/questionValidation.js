// const Joi = require("joi");

// const baseQuestionSchema = Joi.object({
//   question: Joi.string().trim().min(1).required(),
//   choices: Joi.object({
//     a: Joi.string().trim().min(1).required(),
//     b: Joi.string().trim().min(1).required(),
//     c: Joi.string().trim().min(1).required(),
//     d: Joi.string().trim().min(1).required(),
//   }).required(),
//   correctAnswer: Joi.string().valid("a", "b", "c", "d").required(),
//   difficulty: Joi.number().integer().valid(1, 2, 3).optional(),
//   marks: Joi.number().positive().optional(),
//   exam: Joi.string().length(24).hex().required(),
//   user: Joi.string().length(24).hex().required(),
// });

// const createQuestionSchema = baseQuestionSchema;

// const updateQuestionSchema = baseQuestionSchema.min(1);

// module.exports = {
//   createQuestionSchema,
//   updateQuestionSchema,
// };