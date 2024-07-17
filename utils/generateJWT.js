const jwt = require("jsonwebtoken");

/**
 * Genera un token JWT para un usuario.
 * @param {string} _id - ID del usuario.
 * @param {string} name - Nombre del usuario.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} bloodType - Tipo de sangre del usuario.
 * @returns {Promise<string>} - Un token JWT.
 * @throws {Error} - Si hay un error al generar el token.
 * @swagger
 * components:
 *   schemas:
 *     GenerateJWTRequest:
 *       type: object
 *       required:
 *         - _id
 *         - name
 *         - email
 *         - bloodType
 *       properties:
 *         _id:
 *           type: string
 *           description: ID del usuario.
 *         name:
 *           type: string
 *           description: Nombre del usuario.
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario.
 *         bloodType:
 *           type: string
 *           enum: [A, B, AB, O]
 *           description: Tipo de sangre del usuario.
 *       example:
 *         _id: "612f7b8c40d39e5d8b2d6f7c"
 *         name: Juan Pérez
 *         email: juan.perez@example.com
 *         bloodType: O
 *     TokenResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Token JWT para el usuario.
 *       example:
 *         token: "your_jwt_token"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensaje de error.
 *       example:
 *         message: "No se pudo generar el token"
 */

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
