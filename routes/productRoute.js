const app = require('express');
const { getAllProducts, createProduct } = require('../controllers/productController');

const router = app.Router();
router.get('/products', getAllProducts );
router.post('/products', createProduct);

module.exports = router;