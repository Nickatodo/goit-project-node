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
