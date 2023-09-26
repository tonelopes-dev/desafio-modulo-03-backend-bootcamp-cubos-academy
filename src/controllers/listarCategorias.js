const pool = require('../conexao');

const listarCategorias = async (req, res) => {
  try {
    const categorias = await pool.query('SELECT * FROM categorias');

    return res.status(200).json(categorias.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro interno do Servidor', error: error.message });
  }
};

module.exports = listarCategorias;
