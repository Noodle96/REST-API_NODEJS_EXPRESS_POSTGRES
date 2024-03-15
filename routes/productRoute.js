const app = require('express');
const { getAllProducts,
		createProduct,
		updateProduct,
		deleteProduct, 
		getProductById} = require('../controllers/productController');

const router = app.Router();
router.get('/', getAllProducts );
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct)

module.exports = router;