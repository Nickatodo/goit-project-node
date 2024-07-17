/**
 * @swagger
 * /public-products:
 *   get:
 *     summary: Get a list of public products not allowed for a specific blood type.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: bloodType
 *         required: true
 *         schema:
 *           type: string
 *           description: The blood type to filter products that are not allowed.
 *           enum: [A, B, AB, O]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of public products not allowed for the specified blood type.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   weight:
 *                     type: number
 *                   calories:
 *                     type: number
 *       400:
 *         description: Error retrieving the products from the database or invalid blood type.
 */

const { Product } = require("../../schema/productSchema");

const getProductsPublic = async (bloodType) => {
  try {
    const conf = {};

    const bloodTypeIndex = {
      A: 0,
      B: 1,
      AB: 2,
      O: 3,
    }[bloodType];

    conf[`groupBloodNotAllowed.${bloodTypeIndex}`] = true;

    const products = await Product.find(conf);
    return products;
  } catch (error) {
    throw new Error("Error DB");
  }
};

module.exports = getProductsPublic;
