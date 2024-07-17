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
        calories: { type: Number, required: true },
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
  calories: Joi.number().required(),
});

const deleteConsumerSchema = Joi.object({
  title: Joi.string().required(),
  date: Joi.date().iso().required(),
});

module.exports = {
  Consumer,
  addConsumerSchema,
  deleteConsumerSchema,
  /**
   * @swagger
   * components:
   *   schemas:
   *     Consumer:
   *       type: object
   *       required:
   *         - user
   *         - date
   *         - foods
   *       properties:
   *         user:
   *           type: string
   *           description: ID del usuario asociado con el registro de consumo.
   *         date:
   *           type: string
   *           format: date
   *           description: Fecha del registro de consumo.
   *         foods:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 description: ID del producto consumido.
   *               weight:
   *                 type: number
   *                 description: Peso del producto consumido en gramos.
   *               calories:
   *                 type: number
   *                 description: Calorías del producto consumido.
   *           description: Lista de alimentos consumidos en el registro.
   *       example:
   *         user: 609e1a8f8d8b4b45b8c8b8e1
   *         date: 2024-07-17
   *         foods:
   *           - title: 609e1a8f8d8b4b45b8c8b8e2
   *             weight: 250
   *             calories: 150
   *           - title: 609e1a8f8d8b4b45b8c8b8e3
   *             weight: 100
   *             calories: 50
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     AddConsumerRequest:
   *       type: object
   *       required:
   *         - title
   *         - weight
   *         - date
   *         - calories
   *       properties:
   *         title:
   *           type: string
   *           description: ID del producto consumido.
   *         weight:
   *           type: number
   *           description: Peso del producto consumido en gramos.
   *         date:
   *           type: string
   *           format: date
   *           description: Fecha del registro de consumo.
   *         calories:
   *           type: number
   *           description: Calorías del producto consumido.
   *       example:
   *         title: 609e1a8f8d8b4b45b8c8b8e2
   *         weight: 250
   *         date: 2024-07-17
   *         calories: 150
   *
   *     DeleteConsumerRequest:
   *       type: object
   *       required:
   *         - title
   *         - date
   *       properties:
   *         title:
   *           type: string
   *           description: ID del producto consumido.
   *         date:
   *           type: string
   *           format: date
   *           description: Fecha del registro de consumo.
   *       example:
   *         title: 609e1a8f8d8b4b45b8c8b8e2
   *         date: 2024-07-17
   */
};
