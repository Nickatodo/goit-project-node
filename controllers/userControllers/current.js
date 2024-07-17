/**
 * @swagger
 * /current-user:
 *   get:
 *     summary: Get the current user's information.
 *     tags: [Users]
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
 *                   description: The name of the user.
 *                 email:
 *                   type: string
 *                   description: The email of the user.
 *       401:
 *         description: Not authorized to access the user information.
 */

const { User } = require("../../schema/userSchema");

const current = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user });
    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = current;
