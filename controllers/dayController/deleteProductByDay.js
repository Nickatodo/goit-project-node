//const { Product } = require("../../schema/productSchema");
const { Consumer } = require("../../schema/consumerSchema");

const deleteProductByDay = async (req, res) => {
  try {
    const { date, title } = req.body;
    /*
    const verifyFood = await Product.findById(title);
    if (!verifyFood) {
      return res.status(400).json({
        message: "food not found",
      });
    }
*/
    console.log(date);
    console.log(title);
    const deleteConsumer = await Consumer.findOne({
      user: req.user._id,
      date: new Date(date),
    });
    console.log(deleteConsumer);
    if (!deleteConsumer) {
      return res.status(404).json({ message: "No record was found" });
    }

    const foodExist = deleteConsumer.foods.some(
      (food) => food.title.toString() === title
    );
    console.log(foodExist);
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
