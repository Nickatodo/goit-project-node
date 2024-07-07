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
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error de Joi u otra biblioteca de validación" });
  }
};

module.exports = login;
