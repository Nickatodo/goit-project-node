/**
 * @swagger
 * /users/products:
 *   post:
 *     summary: Get the list of products consumed on a specific day.
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
 *                 description: The date of the consumption record to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of products consumed on the specified day.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 getConsumer:
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
 *       404:
 *         description: No record was found for the specified date.
 *       400:
 *         description: Error retrieving the data from the database.
 */

const { Consumer } = require("../../schema/consumerSchema");

const getProductsByDay = async (req, res) => {
  try {
    const { date } = req.body;

    const getConsumer = await Consumer.findOne({
      user: req.user,
      date: new Date(date),
    })
      .populate("foods.title", "title")
      .exec();

    if (!getConsumer) {
      return res.status(404).json({ message: "No record was found" });
    }

    res.status(200).json({ getConsumer });
  } catch (error) {
    res.status(400).json({ error: "Error DB" });
  }
};

module.exports = getProductsByDay;
