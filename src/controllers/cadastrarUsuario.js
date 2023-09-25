const pool = require('../conexao');
const bcrypt = require('bcrypt');
const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: 'Todos os campos são obrigatórios.' });
  }
  try {
    // Buscando usuário no BD
    const usuario = await pool.query(
      'select * from usuarios where email = $1',
      [email]
    );

    // Verificar se o email já está cadastrado
    if (usuario.rowCount > 0) {
      return res.status(404).json({
        mensagem: 'Já existe usuário cadastrado com o e-mail informado.',
      });
    }

    //Cryptografando a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    //Cadastando Usuario

    const novoUsuario = await pool.query(
      'insert into usuarios (nome, email, senha) values( $1, $2, $3) returning id, nome, email',
      [nome, email, senhaCriptografada]
    );

    return res.status(201).json(novoUsuario.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno do Servidor' });
  }
};

module.exports = {
  cadastrarUsuario,
};
