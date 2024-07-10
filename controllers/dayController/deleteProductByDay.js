const { Product } = require("../../schema/productSchema");
const { Consumer, addConsumerSchema } = require("../../schema/consumerSchema");

const deleteProductByDay = async (req, res) => {
  try {
    const { error } = addConsumerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "missing required field",
      });
    }

    const { date, title, weight } = req.body;

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
