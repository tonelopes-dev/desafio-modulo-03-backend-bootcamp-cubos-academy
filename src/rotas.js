const express = require('express');
const { cadastrarUsuario } = require('./controllers/cadastrarUsuario');
const loginUsuario = require('./controllers/loginUsuario');
const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', loginUsuario);

module.exports = rotas;
