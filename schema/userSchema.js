const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    token: {
      type: String,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    desiredWeight: {
      type: Number,
      default: null,
    },
    age: {
      type: Number,
      default: null,
    },
    bloodType: {
      type: String,
      enum: ["A", "B", "AB", "O"],
      default: null,
    },
    currentWeight: {
      type: Number,
      default: null,
    },
    totalCalories: {
      type: Number,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

const User = model("users", userSchema);

// Validaciones con JOI
const addUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
});

const addDataUserSchema = Joi.object({
  height: Joi.number().required(),
  desiredWeight: Joi.number().required(),
  age: Joi.number().required(),
  bloodType: Joi.string().valid("A", "B", "AB", "O").required(),
  currentWeight: Joi.number().required(),
});

module.exports = {
  User,
  addUserSchema,
  addDataUserSchema,
};
