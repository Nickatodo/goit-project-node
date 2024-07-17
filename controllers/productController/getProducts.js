/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products allowed for the user's blood type.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of products allowed for the user's blood type.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *       400:
 *         description: Error retrieving the products from the database.
 */

const { Product } = require("../../schema/productSchema");

const getProducts = async (req, res) => {
  try {
    const conf = {};

    const bloodTypeIndex = {
      A: 0,
      B: 1,
      AB: 2,
      O: 3,
    }[req.user.bloodType];

    conf[`groupBloodNotAllowed.${bloodTypeIndex}`] = false;

    const products = await Product.find(conf);
    res.status(200).json({ products });
    return products;
  } catch (error) {
    res.status(400).json({ error: "Error DB" });
  }
};

module.exports = getProducts;
