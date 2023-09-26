const pool = require('../../conexao');

const cadastrarTransacao = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  const usuario_id = req.usuario.id;

  if (!descricao || !valor || !data || !categoria_id || !tipo) {
    return res
      .status(400)
      .json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' });
  }

  try {
    const categoriaExistente = await pool.query(
      'SELECT * FROM categorias WHERE id = $1',
      [categoria_id]
    );

    if (categoriaExistente.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
    }

    if (tipo !== 'entrada' && tipo !== 'saida') {
      return res
        .status(400)
        .json({ mensagem: 'O campo "tipo" deve ser "entrada" ou "saida".' });
    }

    const inserirTransacao = await pool.query(
      `
      INSERT INTO transacoes (tipo, descricao, valor, data, categoria_id, usuario_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *, (SELECT descricao FROM categorias WHERE id = $5) as categoria_nome
      `,
      [tipo, descricao, valor, data, categoria_id, usuario_id]
    );

    const transacaoCadastrada = inserirTransacao.rows[0];
    return res.status(201).json(transacaoCadastrada);
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Erro interno do Servidor', error: error.message });
  }
};

module.exports = cadastrarTransacao;
