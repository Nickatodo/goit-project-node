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
