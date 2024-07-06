const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/productController");
const { validateJWT } = require("../../utils/validateJWT");

//En point privados
router.get("/", validateJWT, controllers.getProducts);

module.exports = router;
