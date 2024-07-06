const { Schema, model, Types } = require("mongoose");
const Joi = require("joi");

const productSchema = Schema(
  {
    categories: {
      type: String,
    },
    weight: {
      type: Number,
    },
    title: {
      type: String,
    },
    calories: {
      type: Number,
    },
    groupBloodNotAllowed: {
      type: [Types.Mixed],
    },
  },
  {
    versionKey: false,
  }
);

const Product = model("products", productSchema);

module.exports = {
  Product,
};
