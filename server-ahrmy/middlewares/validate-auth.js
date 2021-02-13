'use strict';

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function validateAuth(req, res, next) {
  try {
    const { authorization } = req.headers;

    // validamos si no hay autorizazion o la autorizacion no empieza con Bearer, se genera un error

    if (!authorization || !authorization.startsWith('Bearer')) {
      return next();
    }
    // separamos Bearer del token
    const accessToken = authorization.split(' ')[1];

    // aquí es donde está la chicha de la verificación, es donde se desencripta el token para validarlo
    const payload = jwt.verify(accessToken, JWT_SECRET);

    const { id, nickname, rol } = payload;
    req.auth = { id, nickname, rol };

    next();
  } catch (err) {
    res.status(401);
    res.send({ error: err.message });
  }
}

module.exports = validateAuth;
