const pool = require('../../conexao');

const obterExtrato = async (req, res) => {
  const { id } = req.usuario;

  try {
    const extrato = await pool.query(
      `
      SELECT 
        SUM(CASE WHEN tipo = 'entrada' THEN valor ELSE 0 END) AS entrada,
        SUM(CASE WHEN tipo = 'saida' THEN valor ELSE 0 END) AS saida
      FROM transacoes
      WHERE usuario_id = $1
      `,
      [id]
    );

    if (extrato.rowCount === 0) {
      return res.status(200).json({ entrada: 0, saida: 0 });
    }

    return res.status(200).json(extrato.rows[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ mensagem: 'Erro interno do Servidor', error: error.message });
  }
};

module.exports = obterExtrato;
