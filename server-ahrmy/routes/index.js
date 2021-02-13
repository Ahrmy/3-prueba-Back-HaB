'use strict';

const { Router } = require('express');
const validateAuth = require('../middlewares/validate-auth');

const registerUsers = require('../controllers/register');
const {
  readGotCharacters,
  readGotHouses,
  readGotCharactersById,
  readGotHousesById,
} = require('../controllers/read-of-got');

const router = Router();

// Realizo los get de Characters and Hauses sin y con id para Game Of Thrones
router.get('/got/characters', validateAuth, (req, res) => readGotCharacters(req, res));
router.get('/got/houses', (req, res) => readGotHouses(req, res));
router.get('/got/characters/:id', (req, res) => readGotCharactersById(req, res));
router.get('/got/houses/:id', (req, res) => readGotHousesById(req, res));

// Realizo los methods del user
router.route('/register').post((req, res) => registerUsers(req, res));
router.route('/login').post((req, res) => registerUsers(req, res));

module.exports = router;
