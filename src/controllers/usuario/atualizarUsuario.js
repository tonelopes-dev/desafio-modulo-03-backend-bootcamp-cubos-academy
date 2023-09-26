const pool = require('../../conexao');
const validacaoUsuario = require('../../utils/validacaoUsuario');
const bcrypt = require('bcrypt');

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id: idUsuario } = req.usuario;

  validacaoUsuario(nome, email, senha);

  try {
    const usuarioExistente = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );

    if (usuarioExistente.rowCount > 0) {
      if (usuarioExistente.rows[0].id !== idUsuario) {
        return res.status(400).json({
          mensagem:
            'O email informado já está sendo utilizado por outro usuário.',
        });
      }
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await pool.query(
      'UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4',
      [nome, email, senhaCriptografada, idUsuario]
    );

    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Erro interno do Servidor', error: error.message });
  }
};

module.exports = atualizarUsuario;
