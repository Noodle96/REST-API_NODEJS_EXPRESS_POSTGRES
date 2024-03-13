const app = require('express');
const { getAllProducts } = require('../controllers/productController');

const router = app.Router();
router.get('/products', getAllProducts );

module.exports = router;