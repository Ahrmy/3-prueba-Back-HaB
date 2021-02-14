'use strict';

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function validateAuth(req, res, next) {
  try {
    const { authorization } = req.headers;
    console.log(authorization);

    // validamos si no hay autorizazion o la autorizacion no empieza con Bearer, se genera un error

    if (!authorization || !authorization.startsWith('Bearer')) {
      const error = new Error('Authorization required');
      error.status = 403;
      throw error;
    }
    // separamos Bearer del token
    const accessToken = authorization.split(' ')[1];

    // aquí es donde está la chicha de la verificación, es donde se desencripta el token para validarlo
    const payload = jwt.verify(accessToken, JWT_SECRET);

    const { firstname, mail } = payload;
    req.auth = { firstname, mail };

    if (!req.auth) {
      res.status(403);
      res.send({ error: 'Autorización requerida' });
    } else {
      next();
    }
  } catch (error) {
    res.status(401);
    res.send({ error: error.message });
  }
}
module.exports = validateAuth;
