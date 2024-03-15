const app = require('express');
const { getAllProducts,
		createProduct,
		updateProduct,
		deleteProduct, 
		getProductById,
		getProductsByCategoryId} = require('../controllers/productController');

const router = app.Router();
router.get('/', getAllProducts );
router.get('/:id',getProductById)
router.get('/category/:categoryID', getProductsByCategoryId);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct)

module.exports = router;