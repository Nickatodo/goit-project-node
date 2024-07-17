const express = require("express");

const appRouter = express.Router();

const userRouter = require("./users");
const dailyrateRouter = require("./dailyrate");
const day = require("./day");
const products = require("./products");

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User-related operations.
 *   - name: Daily Rate
 *     description: Calculate daily caloric intake.
 *   - name: Day
 *     description: Manage daily food intake records.
 *   - name: Products
 *     description: Manage and fetch products.
 */

appRouter.use("/users", userRouter);
appRouter.use("/daily-rate", dailyrateRouter);
appRouter.use("/day", day);
appRouter.use("/products", products);

module.exports = appRouter;
