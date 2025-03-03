/**
 * @swagger
 * /users/food:
 *   delete:
 *     summary: Delete a product from the daily consumption record.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The ID of the product to be deleted.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of consumption.
 *     responses:
 *       200:
 *         description: The product was successfully deleted from the daily consumption record.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Confirmation message.
 *       400:
 *         description: Missing required field, food not found, or food does not exist in the record.
 *       404:
 *         description: No record was found or an error occurred.
 */

const { Product } = require("../../schema/productSchema");
const {
  Consumer,
  deleteConsumerSchema,
} = require("../../schema/consumerSchema");

const deleteProductByDay = async (req, res) => {
  try {
    const { error } = deleteConsumerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "missing required field",
      });
    }
    const { title, date } = req.body;

    const verifyFood = await Product.findById(title);
    if (!verifyFood) {
      return res.status(400).json({
        message: "food not found",
      });
    }

    const deleteConsumer = await Consumer.findOne({
      user: req.user._id,
      date: new Date(date),
    });
    if (!deleteConsumer) {
      return res.status(404).json({ message: "No record was found" });
    }

    const foodExist = deleteConsumer.foods.some(
      (food) => food.title.toString() === title
    );
    if (!foodExist) {
      return res.status(400).json({
        message: "food does not exist",
      });
    }

    deleteConsumer.foods = deleteConsumer.foods.filter(
      (food) => !(food.title.toString() === title)
    );
    await deleteConsumer.save();

    res.status(200).json({ mensaje: "Eliminated food" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = deleteProductByDay;
