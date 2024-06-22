const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.handleListAllProducts)
router.get('/:id', productController.handleViewProduct)

module.exports = router;