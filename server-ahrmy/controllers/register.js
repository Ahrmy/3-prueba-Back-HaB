'use strict';

const Joi = require('joi');
const bcrypt = require('bcryptjs');

const scheme = Joi.object().keys({
  name: Joi.string().required(),
});

async function registerUsers() {
  //asfdasdf
}

module.exports = registerUsers;
