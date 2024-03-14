const app = require('express');
const { getAllProducts,
		createProduct,
		updateProduct,
		deleteProduct } = require('../controllers/productController');

const router = app.Router();
router.get('/products', getAllProducts );
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct)

module.exports = router;