const {pool} = require('../config/database')

const handleListAllProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
      } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
      }
}

const handleViewProduct = async (req, res) => {
    console.log(req.params)
    const {id} = req.params;
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length === 0) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.json(result.rows[0]);
      } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
      }
}

module.exports = { handleListAllProducts, handleViewProduct }
