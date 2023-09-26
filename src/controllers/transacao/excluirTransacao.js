const pool = require('../../conexao');

const excluirTransacao = async (req, res) => {
  const { id } = req.params;
  const usuario_id = req.usuario.id;

  try {
    const transacaoExistente = await pool.query(
      'SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2',
      [id, usuario_id]
    );

    if (transacaoExistente.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Transação não encontrada.' });
    }

    await pool.query('DELETE FROM transacoes WHERE id = $1', [id]);

    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Erro interno do Servidor', error: error.message });
  }
};

module.exports = excluirTransacao;
