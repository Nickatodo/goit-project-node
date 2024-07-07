const { User, addUserSchema } = require("../../schema/userSchema");
const bcrypt = require("bcrypt");
//const { v4: uuidv4 } = require("uuid");

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
