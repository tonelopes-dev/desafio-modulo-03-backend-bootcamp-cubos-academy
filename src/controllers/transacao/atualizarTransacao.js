const pool = require('../../conexao');

const atualizarTransacao = async (req, res) => {
  const { id } = req.params;
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  const usuario_id = req.usuario.id;

  try {
    const transacaoExistente = await pool.query(
      'SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2',
      [id, usuario_id]
    );

    if (transacaoExistente.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Transação não encontrada.' });
    }

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
      return res.status(400).json({
        mensagem: 'Todos os campos obrigatórios devem ser informados.',
      });
    }

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

    const atualizarTransacao = await pool.query(
      `
      UPDATE transacoes
      SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5
      WHERE id = $6
      RETURNING *
      `,
      [descricao, valor, data, categoria_id, tipo, id]
    );

    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Erro interno do Servidor', error: error.message });
  }
};

module.exports = atualizarTransacao;
