const getProductsPublic = require("../productController/getProductsPublic");

/**
 * swagger
 * /api/daily-rate/:
 *    post:
 *      summary: Calcula las calorias diarias y obtiene un listado de alimentos no recomendados.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json
 *            schema:
 *              type: object
 *              required:
 *                - height
 *                - desiredWeight
 *                - age
 *                - bloodType
 *                - currentWeight
 *              properties:
 *                heigth:
 *                  type: number
 *                  example: 170
 *                desiredWeight:
 *                  type: number
 *                  example: 65
 *                age
 *                  type: number
 *                  example: 30
 *                bloodType
 *                  type: string
 *                  example: "A"
 *                currentWeight
 *                  type: number
 *                  example: 70
 *      responses: Bien
 *        200:
 *          description:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  calories:
 *                    type: number
 *                    example: 1500
 *                  products:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                          example: "Apple"
 *                        calories:
 *                          type: number
 *                          example: 52
 *        404:
 *          description: Error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error ex
 */

const dailyRate = async (req, res) => {
  try {
    const { height, desiredWeight, age, bloodType, currentWeight } = req.body;

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

//"FÓRMULA PARA CALCULAR LA INGESTA DIARIA DE CALORÍAS PARA LAS MUJERES
//10 * peso + 6.25 * altura - 5 * edad - 161 - 10 * (peso - peso deseado)"
