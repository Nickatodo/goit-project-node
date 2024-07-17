const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/dailyRateControllers");
const { validateJWT } = require("../../utils/validateJWT");

//End point publicos
/**
 * @swagger
 * tags:
 *   - name: Daily Rate
 *     description: Calculate daily caloric intake and manage daily rate calculations.
 */

/**
 * @swagger
 * /daily-rate:
 *   post:
 *     summary: Calculate daily caloric intake based on user’s height, weight, age, blood type, and desired weight.
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
 *                 description: User's height in centimeters.
 *               desiredWeight:
 *                 type: number
 *                 description: User's target weight in kilograms.
 *               age:
 *                 type: number
 *                 description: User's age in years.
 *               bloodType:
 *                 type: string
 *                 description: User's blood type.
 *               currentWeight:
 *                 type: number
 *                 description: User's current weight in kilograms.
 *     responses:
 *       200:
 *         description: Returns the daily caloric intake and recommended products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 calories:
 *                   type: number
 *                   description: Calculated daily caloric intake.
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input data.
 */

router.post("/", controllers.dailyRate);

//En point privados
/**
 * @swagger
 * /daily-rate/{userId}:
 *   post:
 *     summary: Calculate daily caloric intake for a specific user by userId.
 *     tags: [Daily Rate]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID for the calculation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               height:
 *                 type: number
 *                 description: User's height in centimeters.
 *               desiredWeight:
 *                 type: number
 *                 description: User's target weight in kilograms.
 *               age:
 *                 type: number
 *                 description: User's age in years.
 *               bloodType:
 *                 type: string
 *                 description: User's blood type.
 *               currentWeight:
 *                 type: number
 *                 description: User's current weight in kilograms.
 *     responses:
 *       200:
 *         description: Returns the daily caloric intake and recommended products for the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 calories:
 *                   type: number
 *                   description: Calculated daily caloric intake.
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Unauthorized request.
 *       404:
 *         description: User not found.
 */

router.post("/:userId", validateJWT, controllers.dailyRateById);

module.exports = router;
