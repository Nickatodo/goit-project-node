/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user and generate a JWT token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully logged in and generated a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for the user session.
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the user.
 *                     name:
 *                       type: string
 *                       description: The name of the user.
 *                     email:
 *                       type: string
 *                       description: The email of the user.
 *                     bloodType:
 *                       type: string
 *                       description: The blood type of the user.
 *       401:
 *         description: Invalid email or password.
 *       400:
 *         description: Error with Joi validation or other library validation.
 */

const { User } = require("../../schema/userSchema");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../../utils/generateJWT");

const login = async (req, res) => {
  try {
    // Validacion BD
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Email or password is wrong",
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Email or password is wrong",
      });
    }
    const token = await generateJWT(
      user._id,
      user.name,
      user.email,
      user.bloodType
    );
    await User.findByIdAndUpdate(user._id, {
      token: token,
    });
    res.status(200).json({
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bloodType: user.bloodType,
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error de Joi u otra biblioteca de validación" });
  }
};

module.exports = login;
