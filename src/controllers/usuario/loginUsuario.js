const jwt = require('jsonwebtoken');
const senhaJwt = require('../../senha.JWT');
const bcrypt = require('bcrypt');
const pool = require('../../conexao');

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: 'Usuário e/ou senha inválido(s).' });
  }
  try {
    const usuario = await pool.query(
      'select * from usuarios where email = $1',
      [email]
    );

    if (usuario.rowCount < 1) {
      return res.status(404).json({ mensagem: 'Usuario não Cadastrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);

    if (!senhaValida) {
      return res.status(400).json({ mensagem: 'Email ou senha invalido' });
    }

    const token = jwt.sign({ id: usuario.rows[0].id }, senhaJwt, {
      expiresIn: '8h',
    });

    const { senha: _, ...usuarioLogado } = usuario.rows[0];

    return res.json({ usuario: usuarioLogado, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error interno do Servidor', error: err.message });
  }
};
module.exports = loginUsuario;
