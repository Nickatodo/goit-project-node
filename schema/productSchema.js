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
  /**
   * @swagger
   * components:
   *   schemas:
   *     Product:
   *       type: object
   *       required:
   *         - categories
   *         - weight
   *         - title
   *         - calories
   *         - groupBloodNotAllowed
   *       properties:
   *         categories:
   *           type: string
   *           description: Categoría del producto
   *         weight:
   *           type: number
   *           format: float
   *           description: Peso del producto en gramos
   *         title:
   *           type: string
   *           description: Título o nombre del producto
   *         calories:
   *           type: number
   *           format: float
   *           description: Número de calorías por porción del producto
   *         groupBloodNotAllowed:
   *           type: array
   *           items:
   *             type: string
   *           description: Lista de grupos sanguíneos no permitidos para el producto
   *       example:
   *         categories: Dairy
   *         weight: 100
   *         title: Almond Milk
   *         calories: 30
   *         groupBloodNotAllowed:
   *           - A+
   *           - B-
   */
};
