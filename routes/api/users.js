const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/userControllers/index");
const { validateJWT } = require("../../utils/validateJWT");

//End point publicos
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operations related to users, including registration, login, logout, and fetching current user information.
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *     responses:
 *       201:
 *         description: Successfully registered a new user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Invalid request body or validation error.
 *       409:
 *         description: Email already in use.
 */
router.post("/signup", controllers.registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate a user and return a JWT token.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Successfully authenticated. Returns a JWT token and user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for authentication.
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user's ID.
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                     email:
 *                       type: string
 *                       description: The user's email address.
 *                     bloodType:
 *                       type: string
 *                       description: The user's blood type.
 *       400:
 *         description: Invalid email or password.
 */
router.post("/login", controllers.login);

//End point privados
/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Log out the current user by invalidating the JWT token.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Successfully logged out. Token is invalidated.
 *       401:
 *         description: Unauthorized request. The user must be authenticated.
 */
router.post("/logout", validateJWT, controllers.logout);

/**
 * @swagger
 * /users/current:
 *   get:
 *     summary: Retrieve the current user's information.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the current user's information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *                 email:
 *                   type: string
 *                   description: The user's email address.
 *       401:
 *         description: Unauthorized request. The user must be authenticated.
 */
router.get("/current", validateJWT, controllers.current);

module.exports = router;
