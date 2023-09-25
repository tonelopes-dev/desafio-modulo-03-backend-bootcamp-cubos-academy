const express = require('express');
const { cadastrarUsuario } = require('./controllers/cadastrarUsuario');
const loginUsuario = require('./controllers/loginUsuario');
const verificarUsuarioLogado = require('./middlewares/authentication');
const detalharUsuario = require('./controllers/detalharUsuario');
const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', loginUsuario);

rotas.use(verificarUsuarioLogado);

rotas.get('/usuario', detalharUsuario);

module.exports = rotas;
