const express = require('express');
const listarCategorias = require('../controllers/listarCategorias');
const rotasCategorias = express();

rotasCategorias.get('/', listarCategorias);

module.exports = rotasCategorias;
