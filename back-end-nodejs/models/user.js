const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const usersSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z]+$/.test(v);
        },
        message: () => "First name must contain only letters",
      },
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z]+$/.test(v);
        },
        message: () => "Last name must contain only letters",
      },
    },
    username: {
      type: String,
      required: true,
      unique: [true, 'user already registered'],
      minLength: 8,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z]{1,}[a-zA-Z0-9]*$/.test(v);
        },
        message: () =>
          "Username must start with a letter and contain only letters and numbers",
      },
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'user already registered'],
      validate: {
        validator: function (v) {
          return /^[a-zA-Z][a-zA-Z0-9]{2,}@[a-zA-Z]{2,10}\.[a-zA-Z]{2,5}$/.test(
            v
          );
        },
        message: () => "Invalid Email",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z][a-zA-Z0-9@$#%&*_-]{8,}$/.test(v);
        },
        message: () =>
          "Password must be at least 9 characters, start with a letter, and can include letters, numbers, and symbols like _ - @ $ # % & *",
      },
    },
    birthDate: {
      type: Date,
      required: false,
    },
    role: {
      type: String,
      enum: ["teacher", "student"],
      default: "student",
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
      required: function () {
        return this.role === "student";
      },
    },
    passwordResetCode: {
      required: false,
      type: String,
    },
    passwordResetExpires: {
      required: false,
      type: Date,
    },
  },
  { timestamps: true }
);

usersSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    let salt = await bcryptjs.genSalt(10);
    let hashedPassword = await bcryptjs.hash(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

const User = mongoose.model("User", usersSchema);
module.exports = User;
