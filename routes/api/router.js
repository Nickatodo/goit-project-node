const express = require("express");

const appRouter = express.Router();

const userRouter = require("./users");
const dailyrateRouter = require("./dailyrate");
const day = require("./day");
const products = require("./products");

appRouter.use("/users", userRouter);
appRouter.use("/daily-rate", dailyrateRouter);
appRouter.use("/day", day);
appRouter.use("/products", products);

module.exports = appRouter;
