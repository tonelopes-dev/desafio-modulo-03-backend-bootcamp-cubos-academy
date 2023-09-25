function validacaoUsuario(nome, email, senha) {
  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: 'Todos os campos são obrigatórios.' });
  }
}

module.exports = validacaoUsuario;
