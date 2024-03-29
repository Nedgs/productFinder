const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to check product availability
router.post('/checkAvailability', productController.checkAvailability);

module.exports = router;
