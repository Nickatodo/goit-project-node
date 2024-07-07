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
      user: req.user,
      date: new Date(date),
    });

    if (!deleteConsumer) {
      return res.status(404).json({ message: "No record was found" });
    }

    const foodExist = deleteConsumer.foods.some(
      (food) => food.title.toString() === title && food.weight === weight
    );
    if (!foodExist) {
      return res.status(400).json({
        message: "food does not exist",
      });
    }

    deleteConsumer.foods = deleteConsumer.foods.filter(
      (food) => !(food.title.toString() === title && food.weight === weight)
    );
    await deleteConsumer.save();

    res.status(200).json({ mensaje: "Eliminated food" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = deleteProductByDay;
