'use strict';
const fetch = require('node-fetch');
const jsonError = require('./json-error');
const Joi = require('joi');

async function readGotCharacters(req, res) {
  try {
    const response = await fetch('https://anapioficeandfire.com/api/characters');
    const data = await response.json();
    return res.send(data);
  } catch (error) {
    jsonError(error, res);
  }
}

async function readGotHouses(req, res) {
  try {
    const response = await fetch('https://anapioficeandfire.com/api/houses');
    const data = await response.json();
    return res.send(data);
  } catch (error) {
    jsonError(error, res);
  }
}
async function readGotCharactersById(req, res) {
  try {
    const { id } = req.params;
    const url = `https://anapioficeandfire.com/api/characters/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return res.send(data);
  } catch (error) {
    jsonError(error, res);
  }
}

async function readGotHousesById(req, res) {
  try {
    const { id } = req.params;
    const url = `https://anapioficeandfire.com/api/houses/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return res.send(data);
  } catch (error) {
    jsonError(error, res);
  }
}

async function findGotCharacters(req, res) {
  try {
    const { key, value } = req.params;
    console.log(key, value);
    const url = `https://anapioficeandfire.com/api/characters?${key}=${value}`;
    const response = await fetch(url);
    const data = await response.json();
    return res.send(data);
  } catch (error) {
    jsonError(error, res);
  }
}
module.exports = { readGotCharacters, readGotHouses, readGotCharactersById, readGotHousesById, findGotCharacters };
