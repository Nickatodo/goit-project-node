const { Schema, model, Types } = require("mongoose");
const Joi = require("joi");

const consumerSchema = Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    foods: [
      {
        title: { type: Types.ObjectId, ref: "products", required: true },
        weight: { type: Number, required: true },
      },
    ],
  },
  {
    versionKey: false,
  }
);

const Consumer = model("consumers", consumerSchema);

const addConsumerSchema = Joi.object({
  title: Joi.string().required(),
  weight: Joi.number().required(),
  date: Joi.date().iso().required(),
});

module.exports = { Consumer, addConsumerSchema };
