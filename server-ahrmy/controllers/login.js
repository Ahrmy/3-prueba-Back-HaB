'use strict';

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getConnection } = require('../database');
const jsonError = require('./json-error');

const scheme = Joi.object().keys({
  mail: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

async function loginUser(req, res) {
  try {
    const { mail, password } = req.body;
    // Validamos los datos recibidos por el body
    await scheme.validateAsync(req.body);

    const userPassword = await getConnection().get('user').find({ mail }).value();
    const existMail = await getConnection().get('user').find({ mail }).value();
    const isValidPassword = await bcrypt.compare(password, userPassword.password);

    if (!existMail || !isValidPassword) {
      const error = new Error('No existe un usuario con este correo electrónico o el password no es válido');
      error.code = 401;
      throw error;
    } else {
      const secret = process.env.JWT_SECRET;
      const { firstname, mail } = userPassword;
      const jwtTokenExpiration = '10d';
      const payload = { firstname, mail };
      console.log(payload);
      const token = jwt.sign(payload, secret, { expiresIn: jwtTokenExpiration });
      const response = {
        accessToken: token,
        expiresIn: jwtTokenExpiration,
      };
      res.send(response);
    }
  } catch (error) {
    jsonError(error, res);
  }
}

module.exports = loginUser;
