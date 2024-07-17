/**
 * @swagger
 * /daily-rate:
 *   post:
 *     summary: Calculate daily calorie intake and get products based on blood type.
 *     tags: [Daily Rate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               height:
 *                 type: number
 *                 description: The height of the user in centimeters.
 *               desiredWeight:
 *                 type: number
 *                 description: The desired weight of the user in kilograms.
 *               age:
 *                 type: number
 *                 description: The age of the user in years.
 *               bloodType:
 *                 type: string
 *                 description: The blood type of the user (A, B, AB, O).
 *               currentWeight:
 *                 type: number
 *                 description: The current weight of the user in kilograms.
 *     responses:
 *       200:
 *         description: Successfully calculated daily calorie intake and retrieved products based on the user's blood type.
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
 *                       weight:
 *                         type: number
 *                       calories:
 *                         type: number
 *                 bloodType:
 *                   type: string
 *                   description: The blood type used for retrieving the products.
 *       404:
 *         description: Error calculating the daily rate or retrieving the products.
 */

const getProductsPublic = require("../productController/getProductsPublic");

const dailyRate = async (req, res) => {
  try {
    const { height, desiredWeight, age, bloodType, currentWeight } = req.body;

    //"FÓRMULA PARA CALCULAR LA INGESTA DIARIA DE CALORÍAS PARA LAS MUJERES
    //10 * peso + 6.25 * altura - 5 * edad - 161 - 10 * (peso - peso deseado)"
    const calories =
      10 * currentWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (currentWeight - desiredWeight);
    const products = await getProductsPublic(bloodType);

    res.status(200).json({ calories, products });
  } catch (error) {
    console.error("Daily rate calculation error:", error);
    res.status(404).json({ message: "Error when calculating" });
  }
};

module.exports = dailyRate;
