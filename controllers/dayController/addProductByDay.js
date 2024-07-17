/**
 * @swagger
 * /users/food:
 *   post:
 *     summary: Add a product to the daily consumption record.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of consumption.
 *               title:
 *                 type: string
 *                 description: The ID of the product being consumed.
 *               weight:
 *                 type: number
 *                 description: The weight of the product consumed.
 *               calories:
 *                 type: number
 *                 description: The calories per 100 grams of the product.
 *     responses:
 *       200:
 *         description: The product was successfully added to the daily consumption record.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newConsumer:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     user:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date
 *                     foods:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                           weight:
 *                             type: number
 *                           calories:
 *                             type: number
 *       400:
 *         description: Missing required field or food already exists.
 *       500:
 *         description: Error adding consumer.
 */

const { Product } = require("../../schema/productSchema");
const { Consumer, addConsumerSchema } = require("../../schema/consumerSchema");

const addProductByDay = async (req, res) => {
  try {
    const { error } = addConsumerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "missing required field",
      });
    }

    const { date, title, weight, calories } = req.body;

    const verifyFood = await Product.findById(title);
    if (!verifyFood) {
      return res.status(400).json({
        message: "food not found",
      });
    }

    let newConsumer = await Consumer.findOne({
      user: req.user._id,
      date: new Date(date),
    });
    if (!newConsumer) {
      newConsumer = Consumer({
        user: req.user._id,
        date: new Date(date),
        foods: [],
      });
    } else {
      const foodExist = newConsumer.foods.some(
        (food) => food.title.toString() === title
      );
      if (foodExist) {
        return res.status(400).json({
          message: "food already exists",
        });
      }
    }
    const totalCalories = (weight * calories) / 100;
    newConsumer.foods.push({ title, weight, calories: totalCalories });
    await newConsumer.save();

    const populatedConsumer = await Consumer.findById(newConsumer._id)
      .populate("foods.title", "title")
      .exec();

    res.status(200).json({ newConsumer: populatedConsumer });
  } catch (error) {
    res.status(500).json({ message: "Error add consumer" });
  }
};

module.exports = addProductByDay;
