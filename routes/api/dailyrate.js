const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/dailyRateControllers");
const { validateJWT } = require("../../utils/validateJWT");

//End point publicos
router.post("/", controllers.dailyRate);

//En point privados
router.post("/:userId", validateJWT, controllers.dailyRateById);

module.exports = router;
