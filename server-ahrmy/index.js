'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const { createConnection } = require('./database');

// Public
const port = process.env.SERVER_PORT || 3001;
app.use(express.static(path.join(__dirname, 'public')));

// Save Json
createConnection();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.use(require('./routes/index'));

// Error 404
app.use((req, res, next) => {
  res.status(404).send('404 Not found in my server');
});

app.listen(port, () => {
  console.log(`Servidor web escuchando en el puerto ${port}`);
});
