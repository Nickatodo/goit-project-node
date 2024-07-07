const jwt = require("jsonwebtoken");

const generateJWT = (_id, name, email, bloodType) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { _id, name, email, bloodType },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
      (error, token) => {
        if (error) {
          reject(new Error("No se pudo generar el token"));
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generateJWT };
