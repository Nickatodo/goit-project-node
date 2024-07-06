const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/dayController");
const { validateJWT } = require("../../utils/validateJWT");

//En point privados
router.post("/", validateJWT, controllers.addProductByDay);

router.delete("/", validateJWT, controllers.deleteProductByDay);

router.post("/info", validateJWT, controllers.getProductsByDay);

module.exports = router;
