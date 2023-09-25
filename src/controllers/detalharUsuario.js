const detalharUsuario = (req, res) => {
  const { id, nome, email } = req.usuario;

  const detalhesUsuario = {
    id,
    nome,
    email,
  };
  return res.json(detalhesUsuario);
};

module.exports = detalharUsuario;
