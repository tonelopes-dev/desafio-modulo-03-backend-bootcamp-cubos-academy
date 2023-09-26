const pool = require('../../conexao');
const bcrypt = require('bcrypt');
const validacaoUsuario = require('../../utils/validacaoUsuario');

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  validacaoUsuario(nome, email, senha);

  try {
    const usuario = await pool.query(
      'select * from usuarios where email = $1',
      [email]
    );

    if (usuario.rowCount > 0) {
      return res.status(404).json({
        mensagem: 'Já existe usuário cadastrado com o e-mail informado.',
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await pool.query(
      'insert into usuarios (nome, email, senha) values( $1, $2, $3) returning id, nome, email',
      [nome, email, senhaCriptografada]
    );

    return res.status(201).json(novoUsuario.rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error interno do Servidor', error: error.message });
  }
};

module.exports = {
  cadastrarUsuario,
};
