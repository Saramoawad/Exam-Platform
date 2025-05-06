const joi = require("joi");

const baseUserSchema = joi
  .object({
    firstName: joi.string().min(3).max(15).pattern(new RegExp("^[a-zA-Z]+$")),
    lastName: joi.string().min(3).max(15).pattern(new RegExp("^[a-zA-Z]+$")),
    username: joi
      .string()
      .min(8)
      .pattern(new RegExp("^[a-zA-Z]{1,}[a-zA-Z0-9]*$")),
    email: joi
      .string()
      .pattern(
        new RegExp("^[a-zA-Z][a-zA-Z0-9]{2,}@[a-zA-Z]{2,10}.[a-zA-Z]{2,5}$")
      ),
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
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z][a-zA-Z0-9@$#%&*_-]{8,}$")),
    birthDate: joi.date().optional(),
    role: joi.string().valid("teacher", "student").default("user"),
  })
  .custom((value, helpers) => {
    if (value.role === "student" && !value.stageLevel) {
      return helpers.error("any.custom", {
        message: "`stageLevel` is required when role is student",
      });
    }
    return value;
  });

const createUserSchema = baseUserSchema.fork(
  ["firstName", "lastName", "username", "email", "password"],
  (schema) => schema.required()
);

const updateUserSchema = baseUserSchema;

module.exports = {
  createUserSchema,
  updateUserSchema,
};
