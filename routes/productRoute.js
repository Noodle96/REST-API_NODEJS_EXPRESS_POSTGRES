const app = require('express');
const { getAllProducts, createProduct, updateProduct } = require('../controllers/productController');

const router = app.Router();
router.get('/products', getAllProducts );
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);

module.exports = router;