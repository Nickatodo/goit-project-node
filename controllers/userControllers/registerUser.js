/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user with a name, email, and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The password for the user.
 *                 example: password123
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
 *                       description: The name of the user.
 *                     email:
 *                       type: string
 *                       description: The email of the user.
 *       400:
 *         description: Validation error or other validation library errors.
 *       409:
 *         description: Email is already in use.
 */

const { User, addUserSchema } = require("../../schema/userSchema");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    // Validacion JOI
    const { error } = addUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "all required fields",
      });
    }

    // Validacion de BD
    const { password, email } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(409).json({
        message: "Email in use",
      });
    }

    const bcrypSalt = bcrypt.genSaltSync();
    const createUser = User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(password, bcrypSalt),
    });
    const user = await createUser.save();

    res.status(201).json({
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error de Joi u otra biblioteca de validación",
    });
  }
};

module.exports = registerUser;
