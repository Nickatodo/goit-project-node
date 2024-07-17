/**
 * @swagger
 * /users/daily-rate:
 *   post:
 *     summary: Calculate daily calorie intake and get products not allowed for the user's blood type.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               height:
 *                 type: number
 *                 description: The user's height in centimeters.
 *               desiredWeight:
 *                 type: number
 *                 description: The user's desired weight in kilograms.
 *               age:
 *                 type: number
 *                 description: The user's age in years.
 *               bloodType:
 *                 type: string
 *                 description: The user's blood type.
 *                 enum: [A, B, AB, O]
 *               currentWeight:
 *                 type: number
 *                 description: The user's current weight in kilograms.
 *     responses:
 *       200:
 *         description: The user's daily calorie intake and a list of products not allowed for their blood type.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 calories:
 *                   type: number
 *                   description: The calculated daily calorie intake.
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       calories:
 *                         type: number
 *                       groupBloodNotAllowed:
 *                         type: array
 *                         items:
 *                           type: boolean
 *                   description: A list of products not allowed for the user's blood type.
 *                 bloodType:
 *                   type: string
 *                   description: The user's blood type.
 *                 token:
 *                   type: string
 *                   description: A new JWT token for the user.
 *       500:
 *         description: Error calculating daily rate.
 */

const { User } = require("../../schema/userSchema");
const { Product } = require("../../schema/productSchema");
const { generateJWT } = require("../../utils/generateJWT");

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

    const token = await generateJWT(
      user._id,
      user.name,
      user.email,
      user.bloodType
    );
    await User.findByIdAndUpdate(user._id, {
      token: token,
    });

    const bloodTypeIndex = {
      A: 0,
      B: 1,
      AB: 2,
      O: 3,
    }[bloodType];
    const products = await Product.find({
      [`groupBloodNotAllowed.${bloodTypeIndex}`]: true,
    });

    res.status(200).json({ calories, products, bloodType, token });
  } catch (error) {
    res.status(500).json({ message: "Error calculating daily rate" });
  }
};

module.exports = dailyRateById;
