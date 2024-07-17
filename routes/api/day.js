const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/dayController");
const { validateJWT } = require("../../utils/validateJWT");

//En point privados
/**
 * @swagger
 * tags:
 *   - name: Day
 *     description: Manage daily product records for users.
 */

/**
 * @swagger
 * /day:
 *   post:
 *     summary: Add a product to the daily record for the authenticated user.
 *     tags: [Day]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to add to the daily record.
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product.
 *     responses:
 *       200:
 *         description: Product successfully added to the daily record.
 *       401:
 *         description: Unauthorized request.
 *       400:
 *         description: Invalid input data.
 */
router.post("/", validateJWT, controllers.addProductByDay);

/**
 * @swagger
 * /day:
 *   delete:
 *     summary: Remove a product from the daily record for the authenticated user.
 *     tags: [Day]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to remove from the daily record.
 *     responses:
 *       200:
 *         description: Product successfully removed from the daily record.
 *       401:
 *         description: Unauthorized request.
 *       400:
 *         description: Invalid input data.
 */
router.delete("/", validateJWT, controllers.deleteProductByDay);

/**
 * @swagger
 * /day/info:
 *   post:
 *     summary: Get the list of products added to the daily record for the authenticated user.
 *     tags: [Day]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date for which to retrieve the daily record.
 *     responses:
 *       200:
 *         description: List of products added to the daily record for the specified date.
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
 *         description: Unauthorized request.
 *       400:
 *         description: Invalid input data.
 */
router.post("/info", validateJWT, controllers.getProductsByDay);

module.exports = router;
