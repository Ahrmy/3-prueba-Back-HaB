'use strict';

const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { getConnection } = require('../database');
const jsonError = require('./json-error');
const { v4: uuidv4 } = require('uuid');

const scheme = Joi.object().keys({
  firstname: Joi.string().required(),
  mail: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

async function registerUsers(req, res) {
  try {
    const { firstname, mail, password } = req.body;
    // Validamos los datos recibidos por el body
    await scheme.validateAsync(req.body);
    // creamos un Id único, con un metodo fácil, podia haber hecho un map de los id y luego un Math.max para saber el valor más alto y sumarle uno al nuevo id
    const id = uuidv4();
    const passwordHash = await bcrypt.hash(password, 12);
    //validamos que no exista nuestro usuario(mail) en la base de datos
    const existMail = await getConnection().get('user').find({ mail }).value();

    if (!existMail) {
      //insertamos en la base de datos
      const newUser = await getConnection().get('user').push({ id, firstname, mail, password: passwordHash }).write();
      res.send({
        status: 'ok',
        data: { firstname: firstname, mail: mail },
      });
    } else {
      const error = new Error('Ya existe un usuario con este email');
      error.status = 409;
      throw error;
    }
  } catch (error) {
    jsonError(error, res);
  }
}

module.exports = registerUsers;
