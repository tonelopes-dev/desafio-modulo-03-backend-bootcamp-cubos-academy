const pool = require('../../conexao');

const listarTransacaoUsuario = async (req, res) => {
  const { id } = req.usuario;

  try {
    const transacoes = await pool.query(
      `
      SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao AS categoria_nome 
      FROM transacoes t 
      LEFT JOIN categorias c ON t.categoria_id = c.id
      WHERE t.usuario_id = $1
    `,
      [id]
    );

    return res.status(200).json(transacoes.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Erro interno do Servidor', error: error.message });
  }
};

module.exports = listarTransacaoUsuario;
