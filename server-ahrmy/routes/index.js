'use strict';

const { Router } = require('express');
const validateAuth = require('../middlewares/validate-auth');

const registerUsers = require('../controllers/register');
const loginUser = require('../controllers/login');
const {
  readGotCharacters,
  readGotHouses,
  readGotCharactersById,
  readGotHousesById,
  findGotCharacters,
} = require('../controllers/read-of-got');

const router = Router();

// Realizo los get de Characters and Hauses sin y con id para Game Of Thrones
router.get('/got/characters', validateAuth, (req, res) => readGotCharacters(req, res));
router.get('/got/houses', validateAuth, (req, res) => readGotHouses(req, res));
router.get('/got/characters/:id', validateAuth, (req, res) => readGotCharactersById(req, res));
router.get('/got/houses/:id', validateAuth, (req, res) => readGotHousesById(req, res));
// Realizo los get de Characters con filtrado en base a esa query /got/characters?gender=female = http://localhost:3000/got/characters/gender/female
router.get('/got/characters/:key/:value', validateAuth, (req, res) => findGotCharacters(req, res));

// Realizo los methods del user
router.route('/register').post((req, res) => registerUsers(req, res));
router.route('/login').post((req, res) => loginUser(req, res));

module.exports = router;
