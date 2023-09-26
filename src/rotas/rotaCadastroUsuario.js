const express = require('express');
const { cadastrarUsuario } = require('../controllers/usuario/cadastrarUsuario');

const rotaCadastroUsuarios = express();

rotaCadastroUsuarios.post('/', cadastrarUsuario);

module.exports = rotaCadastroUsuarios;
