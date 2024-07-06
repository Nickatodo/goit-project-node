const { User } = require("../../schema/userSchema");

const logout = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user });
    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await User.findByIdAndUpdate(user._id, {
      token: null,
    });
    res.status(204).json({
      message: "No Content",
    });
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = logout;
