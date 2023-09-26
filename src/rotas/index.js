const express = require('express');
const verificarUsuarioLogado = require('../middlewares/authentication');

const rotaCadastroUsuarios = require('./rotaCadastroUsuario');
const rotaLogin = require('./rotaLogin');
const rotasUsuarios = require('./rotasUsuario');
const rotasCategorias = require('./rotasCategorias');
const rotasTransacao = require('./rotasTransacao');

const rotas = express();

rotas.post('/usuario', rotaCadastroUsuarios);
rotas.post('/login', rotaLogin);

rotas.use(verificarUsuarioLogado);

rotas.use('/usuario', rotasUsuarios);

rotas.use('/categoria', rotasCategorias);
rotas.use('/transacao', rotasTransacao);

module.exports = rotas;
