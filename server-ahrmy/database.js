'use strict';

const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

let db = {};

async function createConnection() {
  //Creo el archivo de la base de datos json
  const adapter = new FileAsync('myDB.json');
  db = await low(adapter);
  //creo la estructura del json
  db.defaults({ user: [] }).write();
}

const getConnection = () => db;

module.exports = { createConnection, getConnection };

// Add a post
// db.get('posts').push({ id: 1, title: 'lowdb is awesome' }).write();

// Set a user using Lodash shorthand syntax
// db.set('user.name', 'typicode').write();
