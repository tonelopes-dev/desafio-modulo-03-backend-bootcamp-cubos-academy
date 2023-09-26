const pool = require('../../conexao');

const detalharTransacao = async (req, res) => {
  const idTransacao = req.params.id;
  const idUsuarioLogado = req.usuario.id;

  try {
    const buscarTransacao = await pool.query(
      `
      SELECT * FROM transacoes 
      WHERE id = $1 AND usuario_id = $2
      `,
      [idTransacao, idUsuarioLogado]
    );

    if (buscarTransacao.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Transação não encontrada.' });
    }

    const transacaoEncontrada = buscarTransacao.rows[0];
    return res.status(200).json(transacaoEncontrada);
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Erro interno do Servidor', error: error.message });
  }
};

module.exports = detalharTransacao;
