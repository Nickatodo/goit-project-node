const jwt = require("jsonwebtoken");

/**
 * Middleware para validar el token JWT.
 * @param {Request} req - El objeto de solicitud.
 * @param {Response} res - El objeto de respuesta.
 * @param {Function} next - La función para pasar al siguiente middleware.
 * @returns {void}
 * @throws {UnauthorizedError} - Si el token no es válido.
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
const validateJWT = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = { validateJWT };
