const jwt = require('jsonwebtoken');
const senhaJwt = require('../senha.JWT');
const pool = require('../conexao');

const verificarUsuarioLogado = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      mensagem:
        'Para acessar este recurso um token de autenticação válido deve ser enviado.',
    });
  }

  const token = authorization.split(' ')[1]; // Defina a variável token aqui

  try {
    const { id } = jwt.verify(token, senhaJwt);

    const { rows, rowCount } = await pool.query(
      'select * from usuarios where id = $1',
      [id]
    );

    if (!rowCount) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    req.usuario = rows[0];

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ mensagem: 'Não autorizado' });
  }
};

module.exports = verificarUsuarioLogado;
