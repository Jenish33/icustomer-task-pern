const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.handleRefreshToken);

module.exports = router;