const { User } = require("../../schema/userSchema");
const { Product } = require("../../schema/productSchema");

const dailyRateById = async (req, res) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user);

    const { height, desiredWeight, age, bloodType, currentWeight } = req.body;
    const calories =
      10 * currentWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (currentWeight - desiredWeight);
    user.height = height;
    user.desiredWeight = desiredWeight;
    user.age = age;
    user.bloodType = bloodType;
    user.currentWeight = currentWeight;
    user.totalCalories = calories;
    await user.save();

    const bloodTypeIndex = {
      A: 0,
      B: 1,
      AB: 2,
      O: 3,
    }[bloodType];
    const products = await Product.find({
      [`groupBloodNotAllowed.${bloodTypeIndex}`]: true,
    });

    res.status(200).json({ calories, products, bloodType });
  } catch (error) {
    res.status(500).json({ message: "Error calculating daily rate" });
  }
};

module.exports = dailyRateById;
