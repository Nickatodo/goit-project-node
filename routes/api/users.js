/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: email's user
 *         password:
 *           type: string
 *           description: password's user
 *       example:
 *         email: pruebamail@goitmail.com
 *         password: passwordg01t
 */
const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/userControllers/index");
const { validateJWT } = require("../../utils/validateJWT");

//End point publicos
router.post("/signup", controllers.registerUser);

router.post("/login", controllers.login);

//End point privados
router.post("/logout", validateJWT, controllers.logout);

router.get("/current", validateJWT, controllers.current);

module.exports = router;
