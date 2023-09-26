const express = require('express');
const detalharUsuario = require('../controllers/usuario/detalharUsuario');
const atualizarUsuario = require('../controllers/usuario/atualizarUsuario');

const rotasUsuarios = express();

rotasUsuarios.get('/', detalharUsuario);
rotasUsuarios.put('/', atualizarUsuario);

module.exports = rotasUsuarios;
