const express = require('express');
const atualizarTransacao = require('../controllers/transacao/atualizarTransacao');
const excluirTransacao = require('../controllers/transacao/excluirTransacao');
const listarTransacaoUsuario = require('../controllers/transacao/listarTransacaoUsuario');
const detalharTransacao = require('../controllers/transacao/detalharTransacao');
const obterExtrato = require('../controllers/transacao/obterExtrato');
const cadastrarTransacao = require('../controllers/transacao/cadastrarTransacao');

const rotasTransacoes = express();

rotasTransacoes.get('/', listarTransacaoUsuario);
rotasTransacoes.get('/extrato', obterExtrato);
rotasTransacoes.post('/', cadastrarTransacao);

rotasTransacoes.get('/:id', detalharTransacao);
rotasTransacoes.put('/:id', atualizarTransacao);
rotasTransacoes.delete('/:id', excluirTransacao);

module.exports = rotasTransacoes;
