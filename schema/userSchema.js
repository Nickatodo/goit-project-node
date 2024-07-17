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
  /**
   * @swagger
   * components:
   *   schemas:
   *     User:
   *       type: object
   *       required:
   *         - name
   *         - email
   *         - password
   *       properties:
   *         id:
   *           type: string
   *           format: ObjectId
   *           description: ID of the user.
   *         name:
   *           type: string
   *           description: Name of the user.
   *         email:
   *           type: string
   *           description: Email of the user.
   *         password:
   *           type: string
   *           description: Password of the user.
   *         token:
   *           type: string
   *           description: JWT token for the user.
   *         height:
   *           type: number
   *           description: Height of the user in cm.
   *         desiredWeight:
   *           type: number
   *           description: Desired weight of the user in kg.
   *         age:
   *           type: number
   *           description: Age of the user.
   *         bloodType:
   *           type: string
   *           description: Blood type of the user.
   *         currentWeight:
   *           type: number
   *           description: Current weight of the user in kg.
   *         totalCalories:
   *           type: number
   *           description: Total calories calculated for the user.
   *       example:
   *         id: 60c72b2f5b8c8c001f647b75
   *         name: John Doe
   *         email: john.doe@example.com
   *         password: securepassword123
   *         token: your_jwt_token
   *         height: 175
   *         desiredWeight: 70
   *         age: 30
   *         bloodType: A
   *         currentWeight: 75
   *         totalCalories: 2000
   *     AddUserRequest:
   *       type: object
   *       required:
   *         - name
   *         - email
   *         - password
   *       properties:
   *         name:
   *           type: string
   *           description: Name of the user.
   *         email:
   *           type: string
   *           description: Email of the user.
   *         password:
   *           type: string
   *           description: Password for the user.
   *       example:
   *         name: John Doe
   *         email: john.doe@example.com
   *         password: securepassword123
   *     AddDataUserRequest:
   *       type: object
   *       required:
   *         - height
   *         - desiredWeight
   *         - age
   *         - bloodType
   *         - currentWeight
   *       properties:
   *         height:
   *           type: number
   *           description: Height of the user in cm.
   *         desiredWeight:
   *           type: number
   *           description: Desired weight of the user in kg.
   *         age:
   *           type: number
   *           description: Age of the user.
   *         bloodType:
   *           type: string
   *           description: Blood type of the user.
   *         currentWeight:
   *           type: number
   *           description: Current weight of the user in kg.
   *       example:
   *         height: 175
   *         desiredWeight: 70
   *         age: 30
   *         bloodType: A
   *         currentWeight: 75
   *     TokenResponse:
   *       type: object
   *       properties:
   *         token:
   *           type: string
   *           description: JWT token for the user.
   *       example:
   *         token: your_jwt_token
   */
};
