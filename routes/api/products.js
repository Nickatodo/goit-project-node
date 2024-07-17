const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/productController");
const { validateJWT } = require("../../utils/validateJWT");

//En point privados
/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Retrieve and manage products.
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products for the authenticated user.
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all products for the authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized request. The user must be authenticated.
 *       500:
 *         description: Server error.
 */
router.get("/", validateJWT, controllers.getProducts);

module.exports = router;
