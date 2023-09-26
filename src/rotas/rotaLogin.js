const express = require('express');
const loginUsuario = require('../controllers/usuario/loginUsuario');

const rotaLogin = express();

rotaLogin.post('/', loginUsuario);

module.exports = rotaLogin;
